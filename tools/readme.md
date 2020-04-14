 python3.7 ../manage.py shell < xlsx_to_db.py
 python3.7 manage.py shell < tools/delete.py
 python3.7 manage.py shell < tools/xlsx_to_db.py

 python manage.py shell < tools/xls_to_db_cal.py

########build the permission script to create the required permissions
 python manage.py shell < tools/create_permissions.py
