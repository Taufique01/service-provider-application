from pyexcel_xlsx import get_data
import json
from search.models import SP

sp_data = get_data("SP_FORMATTED.xlsx")
print(type(sp_data))
print(sp_data['Service Partners'][0])


row_count=0
total_row=len(sp_data['Service Partners'])
for row in sp_data['Service Partners']:
    sp=SP()
    sp.populate_db_row(row)
    print ('done '+str(row_count)+' total '+str(total_row), end="\r")
    row_count=row_count+1

#with open('xls.txt','w') as fl:
#     fl.write(data)
