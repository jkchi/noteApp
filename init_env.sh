conda deactivate
cd .venv/Scripts
./activate
cd ..
cd ..
cd react_django/music_controler/frontend/interface
npm run build
cd ../..
python copy_static.py
python manage.py runserver


# source activate
# source ./activate
