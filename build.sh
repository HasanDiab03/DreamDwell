cd frontend
npm run build

if [ -d "dist" ]; then
  cp -r dist/ ../backend/front-build/
else
  echo "Build directory 'dist' does not exist."
  exit 1
fi