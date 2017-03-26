deploy:
	git checkout gh-pages
	npm run build
	mv build/* .
	git add .
	git commit -m "Automated build commit"
	git push origin gh-pages
	git checkout master
