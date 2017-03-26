require 'csv'
require 'json'
require 'set'

files = Dir.glob('./data/*.csv')

data = files.map do |filename|
  key = filename.split('/').last.gsub(/\.csv$/,'')
  {key => CSV.open(filename, headers: true).map(&:to_h)}
end.reduce(&:merge)

keysets = data.values.map(&:first).map(&:keys)

common_keys = keysets.map { |ks| Set.new(ks) }.reduce(&:intersection).to_a

def slice(hash, keys)
  hash.select { |k,v| keys.include?(k) }.to_h
end

data_with_only_common_keys = data.map do |filename, rows|
  [filename, rows.map { |r| slice(r, common_keys) }]
end.to_h

File.write('./src/source_data.js', "export default " + data_with_only_common_keys.to_json + ";")
