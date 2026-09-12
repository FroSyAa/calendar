.PHONY: install dev build lint format check clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

format:
	prettier --write "src/**/*.{ts,vue,scss,json}"

check:
	npm run type-check # vue-tsc --noEmit

clean:
	rm -rf ./dist ./node_modules/.vite