deploy:
	git checkout gh-pages
	git reset --hard master
	npm run build
	mv build/* .
	git add .
	git commit -m "Automated build commit"
	git push -f origin gh-pages
	git checkout master
