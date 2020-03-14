from pyexcel_xlsx import get_data
import json
from search.models import Calculator,Appliance,System,WholeHome

data = get_data("tools/Book2.xlsx")


print('Done conversion')
print(data)
row_count=0
total_row=len(data['Cinch'])
unit_progress=total_row/100##rows
progress=0##percent

for row in data['Cinch']:
    cal=Calculator() 

    cal.state=row[0]
    cal.tax=0 if row[1]=='N/A' else float(row[1])
    cal.surge_protect=True if row[11]=='YES' else False
    cal.discount=True if row[12]=='YES' else False
    cal.line_protect=True if row[13]=='YES' else False
    cal.electronics_protect=True if row[14]=='YES' else False
    cal.save()

    app=Appliance()
    app.calculator=cal
    app.value=float(row[5])
    app.text='Appliance 150'
    app.save()
  
    app=Appliance()
    app.calculator=cal
    app.value=float(row[6])
    app.text='Appliance 125'
    app.save()

    app=Appliance()
    app.calculator=cal
    app.value=float(row[7])
    app.text='Appliance 100'
    app.save()




    sys=System()
    sys.calculator=cal
    sys.value=float(row[8])
    sys.text='System 150'
    sys.save()
  
    sys=System()
    sys.calculator=cal
    sys.value=float(row[9])
    sys.text='System 125'
    sys.save()

    sys=System()
    sys.calculator=cal
    sys.value=row[10]
    sys.text='System 100'
    sys.save()


    wh=WholeHome()
    wh.calculator=cal
    wh.value=float(row[8])
    wh.text='WholeHome 150'
    wh.save()
  
    wh=WholeHome()
    wh.calculator=cal
    wh.value=float(row[9])
    wh.text='WholeHome 125'
    wh.save()

    wh=WholeHome()
    wh.calculator=cal
    wh.value=float(row[10])
    wh.text='WholeHome 100'
    wh.save()

    if row_count>=unit_progress:
       progress=progress+1
       print ('done '+str(progress)+'%')
       row_count=0
       
    row_count=row_count+1

#with open('xls.txt','w') as fl:
#     fl.write(data)
