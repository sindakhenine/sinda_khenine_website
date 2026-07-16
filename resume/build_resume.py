from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Image, Table, TableStyle, PageBreak, KeepTogether
from PIL import Image as PILImage

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public'/'Sinda_Khenine_Resume.pdf'
PORTRAIT=ROOT/'public'/'assets'/'sinda_picture.jpeg'
PAPER=colors.HexColor('#f3eee3'); INK=colors.HexColor('#20211f'); MUTED=colors.HexColor('#596359'); COPPER=colors.HexColor('#a65f43'); LINE=colors.HexColor('#b9aa97'); CREAM=colors.HexColor('#fffaf0')
W,H=A4

def crop_portrait():
    out=ROOT/'resume'/'.portrait-crop.jpg'
    im=PILImage.open(PORTRAIT).convert('RGB'); w,h=im.size
    target=4/5
    if w/h>target:
        nw=int(h*target); left=(w-nw)//2; box=(left,0,left+nw,h)
    else:
        nh=int(w/target); top=max(0,int((h-nh)*.2)); box=(0,top,w,top+nh)
    im.crop(box).resize((800,1000)).save(out,quality=92)
    return out

styles=getSampleStyleSheet()
body=ParagraphStyle('Body',fontName='Helvetica',fontSize=8.4,leading=11.2,textColor=INK,spaceAfter=2.2*mm)
small=ParagraphStyle('Small',parent=body,fontSize=7.3,leading=9.4,textColor=MUTED)
title=ParagraphStyle('Title',fontName='Times-Roman',fontSize=27,leading=28,textColor=INK,spaceAfter=2*mm)
identity=ParagraphStyle('Identity',parent=body,fontSize=10.2,leading=13,spaceAfter=.8*mm)
section=ParagraphStyle('Section',fontName='Helvetica-Bold',fontSize=7.7,leading=10,textColor=COPPER,spaceBefore=4*mm,spaceAfter=2.5*mm,uppercase=True)
h3=ParagraphStyle('H3',fontName='Times-Roman',fontSize=10.5,leading=12.5,textColor=INK,spaceAfter=.6*mm)
status=ParagraphStyle('Status',fontName='Helvetica-Bold',fontSize=6.8,leading=8,textColor=COPPER,spaceAfter=.7*mm)
summary=ParagraphStyle('Summary',parent=body,fontSize=9.4,leading=13,spaceAfter=4*mm)
bullet=ParagraphStyle('Bullet',parent=body,fontSize=7.8,leading=10.1,leftIndent=3.5*mm,firstLineIndent=-2.5*mm,spaceAfter=.7*mm,bulletIndent=.8*mm)

def link(text,url): return f'<link href="{url}" color="#20211f"><u>{text}</u></link>'
def sec(text): return [Paragraph(text.upper(),section),Spacer(1,.8*mm)]
def item(name,copy='',label=''):
    parts=[]
    if label:parts.append(Paragraph(label.upper(),status))
    parts.append(Paragraph(name,h3))
    if copy:parts.append(Paragraph(copy,small))
    parts.append(Spacer(1,1.4*mm));return Table([[parts]],style=TableStyle([('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0),('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),0)]))
def bullets(lines): return [Paragraph('• '+x,bullet) for x in lines]
def page_bg(canvas,doc):
    canvas.saveState();canvas.setFillColor(PAPER);canvas.rect(0,0,W,H,fill=1,stroke=0);canvas.setStrokeColor(LINE);canvas.line(16*mm,9*mm,W-16*mm,9*mm);canvas.setFont('Helvetica',7);canvas.setFillColor(MUTED);canvas.drawString(16*mm,5.5*mm,'Sinda Khenine · Resume');canvas.drawRightString(W-16*mm,5.5*mm,f'{doc.page} / 2');canvas.restoreState()

doc=BaseDocTemplate(str(OUT),pagesize=A4,leftMargin=16*mm,rightMargin=16*mm,topMargin=14*mm,bottomMargin=13*mm,title='Sinda Khenine Resume',author='Sinda Khenine',subject='Professional resume')
frame=Frame(doc.leftMargin,doc.bottomMargin,doc.width,doc.height,id='main',showBoundary=0)
doc.addPageTemplates(PageTemplate(id='resume',frames=frame,onPage=page_bg))
story=[]
photo=Image(str(crop_portrait()),width=31*mm,height=38.75*mm)
header_text=[Paragraph('Sinda Khenine',title),Paragraph('Senior Big Data &amp; Business Intelligence Engineer',identity),Paragraph('Founder of SKatalyst AI · Author · ML Conference Speaker',identity),Paragraph(f'{link("founder@skatalystai.com","mailto:founder@skatalystai.com")} &nbsp; {link("sindakhenine.com","https://sindakhenine.com")} &nbsp; {link("skatalystai.com","https://skatalystai.com")}',small)]
header=Table([[photo,header_text]],colWidths=[36*mm,doc.width-36*mm],style=TableStyle([('VALIGN',(0,0),(-1,-1),'MIDDLE'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(0,0),5*mm),('RIGHTPADDING',(1,0),(1,0),0),('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),4*mm),('LINEBELOW',(0,0),(-1,-1),.6,LINE)]))
story += [header,Spacer(1,4*mm),Paragraph('Senior data and business intelligence engineer working across enterprise data engineering, governed analytics, document understanding, context engineering, and reliable enterprise AI. Experienced in large-scale processing, predictive modeling, decision support, and AI-driven automation.',summary)]
left=[];right=[]
left+=sec('Experience')
roles=[('Senior Big Data &amp; BI Engineer','Electrolux Germany · Sep 2020 to Present',['Develop enterprise analytics and business intelligence capabilities for industrial decision support.','Build and maintain large-scale data processing and governed analytical workflows.','Apply predictive modeling to forecasting, optimization, and pattern discovery.','Contribute to AI automation and structured technical reporting.']),('Big Data Analyst','Electrolux Germany · Sep 2019 to Aug 2020',['Developed dashboards for consumer feedback and product-performance analysis.','Processed heterogeneous datasets for business intelligence and reporting.','Supported predictive modeling and data-driven decision support.']),('Data Scientist','DomElec, Tunisia · Feb 2017 to Jul 2019',['Developed forecasting and predictive models for operational planning.','Applied statistical and machine-learning methods to engineering and business questions.','Integrated heterogeneous sources for analytics and decision support.'])]
for name,meta,points in roles:left += [Paragraph(name,h3),Paragraph(meta,small),*bullets(points),Spacer(1,2.4*mm)]
right+=sec('Selected Expertise')
expertise=['Enterprise data architecture','Big Data and Apache Spark','Business intelligence and governed analytics','Artificial intelligence and machine learning','Context engineering','Reliable AI agents','Document understanding and validation','Predictive analytics','Technical writing and conference speaking']
tags=[[Paragraph(x,small),Paragraph(expertise[i+1],small) if i+1<len(expertise) else ''] for i,x in enumerate(expertise[::2])]
# rebuild pairs without skipping
tags=[]
for i in range(0,len(expertise),2):tags.append([Paragraph(expertise[i],small),Paragraph(expertise[i+1],small) if i+1<len(expertise) else ''])
right.append(Table(tags,colWidths=[28.5*mm,28.5*mm],style=TableStyle([('GRID',(0,0),(-1,-1),.45,LINE),('BACKGROUND',(0,0),(-1,-1),CREAM),('VALIGN',(0,0),(-1,-1),'MIDDLE'),('LEFTPADDING',(0,0),(-1,-1),2*mm),('RIGHTPADDING',(0,0),(-1,-1),2*mm),('TOPPADDING',(0,0),(-1,-1),1.7*mm),('BOTTOMPADDING',(0,0),(-1,-1),1.7*mm)])))
right+=sec('Education')
right += [item('Engineering Degree, Big Data &amp; Business Intelligence','Ecole Polytechnique Internationale<br/>2018 to 2020'),item('Engineering Degree, Computer Science','ESPRIT<br/>2017 to 2018')]
story.append(Table([[left,right]],colWidths=[113*mm,57*mm],style=TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(0,0),0),('RIGHTPADDING',(0,0),(0,0),7*mm),('LEFTPADDING',(1,0),(1,0),0),('RIGHTPADDING',(1,0),(1,0),0),('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),0)])))
story.append(PageBreak())
left=[];right=[]
left+=sec('Selected Work')
for x in [item('SKatalyst AI','Founder-led work connecting fragmented business data to governed analytics, documentation, and customer-owned AI capabilities.'),item('Context Engineering for Reliable Enterprise AI','Research and conference work on source quality, retrieval, permissions, provenance, and evaluation for enterprise agents.'),item('Document Understanding at Scale','A modular approach to noisy OCR, changing layouts, validation, and human review.'),item('The Subconscious Architect','A forthcoming book introducing the five-layer Living Blueprint for understanding hidden patterns beneath behavior and identity.')]:left.append(x)
left+=sec('Speaking')
for x in [item('ML Con Berlin 2026','Context Engineering Is the New Prompt Engineering<br/>From Context to Action: Engineering Reliable Autonomous Enterprise Agents','Upcoming'),item('ML Con Munich 2026','Document Understanding at Scale','Completed'),item('ML Con Berlin 2025','Unlocking Strategic Insight with Unified Data Repositories and AI Copilots','Completed'),item('ML Con Munich 2025','Leveraging Unified Data Repositories and AI Copilots for Strategic Optimization<br/>AMA Session with the ML Experts','Completed')]:left.append(x)
right+=sec('Writing')
for x in [item('Context Engineering Is the New Prompt Engineering','', 'In editorial review'),item('AI Agents in the Enterprise','', 'Draft'),item('Context-Aware Ingestion','', 'Forthcoming'),item('The Subconscious Architect','', 'Publication preparation')]:right.append(x)
right+=sec('Education and Research')
research=[Paragraph('PLANNED',status),Paragraph('Planned PhD Research',h3),Paragraph('<b>Expected start:</b> Q4 2026',small),Paragraph('Reliable enterprise AI, context engineering, data governance, and agent systems.',small)]
right.append(Table([[research]],colWidths=[57*mm],style=TableStyle([('BACKGROUND',(0,0),(-1,-1),CREAM),('LINEBEFORE',(0,0),(0,-1),2,COPPER),('LEFTPADDING',(0,0),(-1,-1),3*mm),('RIGHTPADDING',(0,0),(-1,-1),3*mm),('TOPPADDING',(0,0),(-1,-1),3*mm),('BOTTOMPADDING',(0,0),(-1,-1),3*mm)])))
right+=sec('Public Links')
right += [Paragraph(link('sindakhenine.com','https://sindakhenine.com'),body),Paragraph(link('skatalystai.com','https://skatalystai.com'),body),Paragraph(link('founder@skatalystai.com','mailto:founder@skatalystai.com'),body)]
story.append(Table([[left,right]],colWidths=[113*mm,57*mm],style=TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(0,0),0),('RIGHTPADDING',(0,0),(0,0),7*mm),('LEFTPADDING',(1,0),(1,0),0),('RIGHTPADDING',(1,0),(1,0),0),('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),0)])))
doc.build(story)
try:(ROOT/'resume'/'.portrait-crop.jpg').unlink()
except FileNotFoundError:pass
print(OUT)
