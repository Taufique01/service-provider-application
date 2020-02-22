from pyexcel_xlsx import get_data
import json
from search.models import SP

sp_data = get_data("tools/sp.xlsx")
print(type(sp_data))
print(sp_data['Service Partners'][0])
print('Done conversion')

row_count=0
total_row=len(sp_data['Service Partners'])
unit_progress=total_row/100##rows
progress=0##percent
for row in sp_data['Service Partners']:
    sp=SP()
    sp.populate_db_row(row)
    if row_count>=unit_progress:
       progress=progress+1
       print ('done '+str(progress)+'%')
       row_count=0
       
    row_count=row_count+1

#with open('xls.txt','w') as fl:
#     fl.write(data)
