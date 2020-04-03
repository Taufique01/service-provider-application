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
    app.value=float(row[2])
    app.text='$150 ded'
    app.save()
  
    app=Appliance()
    app.calculator=cal
    app.value=float(row[3])
    app.text='$125 ded'
    app.save()

    app=Appliance()
    app.calculator=cal
    app.value=float(row[4])
    app.text='$100 ded'
    app.save()




    sys=System()
    sys.calculator=cal
    sys.value=float(row[5])
    sys.text='$150 ded'
    sys.save()
  
    sys=System()
    sys.calculator=cal
    sys.value=float(row[6])
    sys.text='$125 ded'
    sys.save()

    sys=System()
    sys.calculator=cal
    sys.value=row[7]
    sys.text='$100 ded'
    sys.save()


    wh=WholeHome()
    wh.calculator=cal
    wh.value=float(row[8])
    wh.text='$150 ded'
    wh.save()
  
    wh=WholeHome()
    wh.calculator=cal
    wh.value=float(row[9])
    wh.text='$125 ded'
    wh.save()

    wh=WholeHome()
    wh.calculator=cal
    wh.value=float(row[10])
    wh.text='$100 ded'
    wh.save()

    if row_count>=unit_progress:
       progress=progress+1
       print ('done '+str(progress)+'%')
       row_count=0
       
    row_count=row_count+1

#with open('xls.txt','w') as fl:
#     fl.write(data)
