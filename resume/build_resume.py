"""Builds the downloadable CV in English, German and French.

Run with a Python that has reportlab and Pillow:  python3 resume/build_resume.py
Strings already used on the website come from i18n/messages/*.json, so the PDF and the site stay in step;
strings that exist only in the CV carry their own German and French text here.
"""
import json
from pathlib import Path

from PIL import Image as PILImage, ImageDraw
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import BaseDocTemplate, Frame, FrameBreak, KeepTogether, NextPageTemplate, PageBreak, PageTemplate, Paragraph, Spacer

ROOT = Path(__file__).resolve().parents[1]
PORTRAIT = ROOT / 'public' / 'assets' / 'sinda_picture.jpeg'
FILES = {'en': 'Sinda_Khenine_Resume.pdf', 'de': 'Sinda_Khenine_Lebenslauf.pdf', 'fr': 'Sinda_Khenine_CV.pdf'}
CATALOGUE = {lang: json.loads((ROOT / 'i18n' / 'messages' / f'{lang}.json').read_text(encoding='utf-8')) for lang in ('de', 'fr')}

W, H = A4
SIDE = 67 * mm
NIGHT = colors.HexColor('#0b0a17'); INK = colors.HexColor('#12111f'); MUTED = colors.HexColor('#5b5871'); LINE = colors.HexColor('#e3e0f1')
VIOLET = colors.HexColor('#5a3ee6'); MAGENTA = colors.HexColor('#b83df0'); CYAN = colors.HexColor('#19b6e0')
SIDE_TEXT = colors.HexColor('#ecebf7'); SIDE_MUTED = colors.HexColor('#a9a6c2'); SIDE_ACCENT = colors.HexColor('#b9a8ff'); SIDE_LINE = colors.HexColor('#2b2942')

EMAIL = 'founder@skatalystai.com'
LINKS = {
    'site': ('sindakhenine.com', 'https://sindakhenine.com'),
    'company': ('skatalystai.com', 'https://skatalystai.com'),
    'linkedin': ('linkedin.com/in/sinda-khenine', 'https://www.linkedin.com/in/sinda-khenine-67545614b/'),
    'github': ('github.com/sindakhenine', 'https://github.com/sindakhenine'),
    'x': ('x.com/SKatalystAI', 'https://x.com/SKatalystAI'),
}


def copy_key(value):
    """Same FNV-1a key the website uses (i18n/copy.ts)."""
    h = 2166136261
    for ch in ' '.join(value.split()):
        h = ((h ^ (ord(ch) & 0xFFFF)) * 16777619) & 0xFFFFFFFF
    return f's{h:x}'


def esc(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def make_t(lang):
    def t(en, de=None, fr=None):
        if lang == 'en':
            return esc(en)
        own = de if lang == 'de' else fr
        if own is not None:
            return esc(own)
        found = CATALOGUE[lang].get(copy_key(en))
        if found is None:
            raise KeyError(f'No {lang} text for: {en}')
        return esc(found)
    return t


def portrait():
    """Round crop, 3x supersampled so the edge stays smooth in print."""
    out = ROOT / 'resume' / '.portrait-round.jpg'
    size = 540
    im = PILImage.open(PORTRAIT).convert('RGB')
    w, h = im.size; s = min(w, h)
    im = im.crop(((w - s) // 2, (h - s) // 2, (w + s) // 2, (h + s) // 2)).resize((size, size), PILImage.LANCZOS)
    mask = PILImage.new('L', (size * 3, size * 3), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size * 3 - 1, size * 3 - 1), fill=255)
    round_photo = PILImage.new('RGB', (size, size), '#0b0a17')
    round_photo.paste(im, (0, 0), mask.resize((size, size), PILImage.LANCZOS))
    round_photo.save(out, quality=90)
    return out


def styles():
    base = dict(fontName='Helvetica', textColor=INK)
    s = {}
    s['name'] = ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=31, leading=32, textColor=INK, spaceAfter=3.2 * mm)
    s['role'] = ParagraphStyle('role', fontName='Helvetica-Bold', fontSize=10.6, leading=14, textColor=VIOLET)
    s['role2'] = ParagraphStyle('role2', fontName='Helvetica', fontSize=9.6, leading=13, textColor=MUTED, spaceAfter=4.5 * mm)
    s['body'] = ParagraphStyle('body', fontSize=9, leading=12.6, spaceAfter=1.6 * mm, **base)
    s['sec'] = ParagraphStyle('sec', fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=VIOLET, spaceBefore=5.2 * mm, spaceAfter=2.6 * mm)
    s['h3'] = ParagraphStyle('h3', fontName='Helvetica-Bold', fontSize=10.4, leading=13, textColor=INK, spaceAfter=.5 * mm)
    s['meta'] = ParagraphStyle('meta', fontName='Helvetica', fontSize=8.4, leading=11, textColor=MUTED, spaceAfter=1.4 * mm)
    s['small'] = ParagraphStyle('small', fontName='Helvetica', fontSize=8.5, leading=11.3, textColor=colors.HexColor('#3b394e'), spaceAfter=1 * mm)
    s['bullet'] = ParagraphStyle('bullet', parent=s['small'], leftIndent=3.4 * mm, bulletIndent=.4 * mm, spaceAfter=.6 * mm)
    s['tag'] = ParagraphStyle('tag', fontName='Helvetica-Bold', fontSize=6.8, leading=9, textColor=VIOLET, spaceAfter=.6 * mm)
    s['ssec'] = ParagraphStyle('ssec', fontName='Helvetica-Bold', fontSize=7.6, leading=10, textColor=SIDE_ACCENT, spaceBefore=6 * mm, spaceAfter=2.6 * mm)
    s['sbody'] = ParagraphStyle('sbody', fontName='Helvetica', fontSize=8.4, leading=11.6, textColor=SIDE_TEXT, spaceAfter=1.5 * mm)
    s['slabel'] = ParagraphStyle('slabel', fontName='Helvetica', fontSize=6.6, leading=8.6, textColor=SIDE_MUTED, spaceAfter=.2 * mm)
    s['sh3'] = ParagraphStyle('sh3', fontName='Helvetica-Bold', fontSize=8.8, leading=11.4, textColor=colors.white, spaceAfter=.6 * mm)
    s['smeta'] = ParagraphStyle('smeta', fontName='Helvetica', fontSize=7.8, leading=10.6, textColor=SIDE_MUTED, spaceAfter=2.4 * mm)
    s['stag'] = ParagraphStyle('stag', fontName='Helvetica-Bold', fontSize=6.6, leading=9, textColor=SIDE_ACCENT, spaceAfter=.5 * mm)
    return s


def spaced(text):
    """Letter-spaced capitals for section labels."""
    return '&nbsp;'.join(text.upper().split(' ')).replace('&AMP;', '&amp;')


def gradient(canvas, x, y, w, h):
    canvas.saveState()
    p = canvas.beginPath(); p.rect(x, y, w, h); canvas.clipPath(p, stroke=0, fill=0)
    canvas.linearGradient(x, y, x + w, y, (VIOLET, MAGENTA, CYAN), extend=True)
    canvas.restoreState()


def build(lang):
    t = make_t(lang)
    S = styles()
    out = ROOT / 'public' / FILES[lang]
    photo = portrait()
    doc_title = {'en': 'Sinda Khenine · Resume', 'de': 'Sinda Khenine · Lebenslauf', 'fr': 'Sinda Khenine · CV'}[lang]
    updated = {'en': 'Updated November 2026', 'de': 'Stand: November 2026', 'fr': 'Mis à jour en novembre 2026'}[lang]

    def link(text, url, color='#12111f'):
        return f'<link href="{url}" color="{color}">{text}</link>'

    def page(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(colors.white); canvas.rect(0, 0, W, H, fill=1, stroke=0)
        canvas.setFillColor(NIGHT); canvas.rect(0, 0, SIDE, H, fill=1, stroke=0)
        gradient(canvas, 0, H - 2.6 * mm, W, 2.6 * mm)
        if doc.page == 1:
            d = 39 * mm; x = (SIDE - d) / 2; y = H - 17 * mm - d
            canvas.drawImage(str(photo), x, y, d, d)
            canvas.setStrokeColor(VIOLET); canvas.setLineWidth(.7 * mm); canvas.circle(SIDE / 2, y + d / 2, d / 2 + 1 * mm, fill=0, stroke=1)
        canvas.setFont('Helvetica', 6.8); canvas.setFillColor(SIDE_MUTED)
        canvas.drawString(9 * mm, 8 * mm, updated)
        canvas.setFillColor(MUTED)
        canvas.drawString(SIDE + 11 * mm, 8 * mm, doc_title)
        canvas.drawRightString(W - 13 * mm, 8 * mm, f'{doc.page} / 2')
        canvas.setStrokeColor(LINE); canvas.setLineWidth(.5); canvas.line(SIDE + 11 * mm, 11.5 * mm, W - 13 * mm, 11.5 * mm)
        canvas.restoreState()

    doc = BaseDocTemplate(str(out), pagesize=A4, leftMargin=0, rightMargin=0, topMargin=0, bottomMargin=0,
                          title=doc_title.replace(' · ', ' '), author='Sinda Khenine', lang=lang,
                          subject={'en': 'Professional resume', 'de': 'Beruflicher Lebenslauf', 'fr': 'Curriculum vitæ professionnel'}[lang])
    pad = dict(leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, showBoundary=0)
    main_x = SIDE + 11 * mm; main_w = W - main_x - 13 * mm; side_w = SIDE - 18 * mm
    side1 = Frame(9 * mm, 14 * mm, side_w, H - 14 * mm - 62 * mm, id='side1', **pad)
    side2 = Frame(9 * mm, 14 * mm, side_w, H - 14 * mm - 15 * mm, id='side2', **pad)
    main1 = Frame(main_x, 15 * mm, main_w, H - 15 * mm - 16 * mm, id='main1', **pad)
    main2 = Frame(main_x, 15 * mm, main_w, H - 15 * mm - 16 * mm, id='main2', **pad)
    doc.addPageTemplates([PageTemplate(id='first', frames=[side1, main1], onPage=page), PageTemplate(id='second', frames=[side2, main2], onPage=page)])

    def sec(text): return Paragraph(spaced(text), S['sec'])
    def ssec(text): return Paragraph(spaced(text), S['ssec'])
    def contact(label, text, url): return [Paragraph(label.upper(), S['slabel']), Paragraph(link(text, url, '#ecebf7'), S['sbody'])]
    def item(title, text='', tag='', url=None):
        parts = []
        if tag: parts.append(Paragraph(spaced(tag), S['tag']))
        parts.append(Paragraph(link(title, url) if url else title, S['h3']))
        if text: parts.append(Paragraph(text, S['small']))
        parts.append(Spacer(1, 1.7 * mm))
        return KeepTogether(parts)
    def side_item(title, text='', tag='', url=None):
        parts = []
        if tag: parts.append(Paragraph(spaced(tag), S['stag']))
        parts.append(Paragraph(link(title, url, '#ffffff') if url else title, S['sh3']))
        parts.append(Paragraph(text, S['smeta']) if text else Spacer(1, 2.4 * mm))
        return KeepTogether(parts)

    present = {'en': 'Present', 'de': 'heute', 'fr': 'aujourd’hui'}[lang]
    to = {'en': 'to', 'de': 'bis', 'fr': 'à'}[lang]
    months = {'en': {}, 'de': {'Sep': 'Sep.', 'Aug': 'Aug.', 'Feb': 'Feb.', 'Jul': 'Juli'}, 'fr': {'Sep': 'sept.', 'Aug': 'août', 'Feb': 'févr.', 'Jul': 'juil.'}}[lang]
    def span(m1, y1, m2=None, y2=None):
        end = f'{months.get(m2, m2)} {y2}' if m2 else present
        return f'{months.get(m1, m1)} {y1} {to} {end}'
    germany = {'en': 'Germany', 'de': 'Deutschland', 'fr': 'Allemagne'}[lang]
    tunisia = {'en': 'Tunisia', 'de': 'Tunesien', 'fr': 'Tunisie'}[lang]
    local = t('Local experiment', 'Lokales Experiment', 'Expérience locale')

    story = []
    # ---- Page 1, sidebar
    story += [ssec(t('Contact', 'Kontakt', 'Contact'))]
    story += contact(t('Email', 'E-Mail', 'E-mail'), EMAIL, f'mailto:{EMAIL}')
    story += contact(t('Website', 'Website', 'Site web'), *LINKS['site'])
    story += contact('SKatalyst AI', *LINKS['company'])
    story += contact('GitHub', *LINKS['github'])
    story += contact('LinkedIn', *LINKS['linkedin'])
    story += contact('X', *LINKS['x'])
    story += [Paragraph(t('Location', 'Standort', 'Localisation').upper(), S['slabel']), Paragraph(germany, S['sbody'])]
    story += [ssec(t('Selected Expertise'))]
    for line in ['AI orchestration and agent systems', 'Context engineering and RAG', 'MCP and bounded tool use', 'Agent evaluation and observability', 'Frontier AI coding agents', 'Enterprise data architecture', 'Apache Spark and data pipelines', 'Business intelligence and analytics', 'Machine learning and forecasting', 'Document understanding and validation']:
        story.append(Paragraph(f'<font color="#b9a8ff">+</font>&nbsp;&nbsp;{t(line)}', ParagraphStyle('sx', parent=S['sbody'], leftIndent=3.6 * mm, firstLineIndent=-3.6 * mm, spaceAfter=1.1 * mm)))
    story += [ssec(t('Education'))]
    story.append(side_item(t('Engineering Degree · Big Data & Business Intelligence'), f"Ecole Polytechnique Internationale<br/>2018 {to} 2020 · {t('Grade: Very Good', 'Note: Sehr gut', 'Mention : Très bien')}"))
    story.append(side_item(t('Engineering studies · Computer Science'), f'ESPRIT<br/>2017 {to} 2018'))
    story.append(FrameBreak())

    # ---- Page 1, main
    story += [Paragraph('Sinda Khenine', S['name']), Paragraph(t('Senior AI, Data & Business Intelligence Engineer'), S['role']), Paragraph(t('Founder of SKatalyst AI · ML Conference Speaker'), S['role2'])]
    story += [sec(t('Profile', 'Profil', 'Profil'))]
    story.append(Paragraph(t(
        'Senior AI, data and business intelligence engineer with experience since 2017 across industrial analytics, machine learning and enterprise data platforms. Founder of SKatalyst AI, focused on AI orchestration, context engineering and building agent-based systems. Hands-on practice combines experiments in agent autonomy with software development using frontier AI coding agents.',
        'Senior-Ingenieurin für KI, Daten und Business Intelligence mit Erfahrung seit 2017 in industrieller Analytik, maschinellem Lernen und Enterprise-Datenplattformen. Gründerin von SKatalyst AI mit Schwerpunkt auf KI-Orchestrierung, Context Engineering und agentenbasierten Systemen. Die praktische Arbeit verbindet Experimente zur Autonomie von Agenten mit Softwareentwicklung mithilfe moderner KI-Coding-Agenten.',
        'Ingénieure senior en IA, données et business intelligence, avec une expérience depuis 2017 en analytique industrielle, machine learning et plateformes de données d’entreprise. Fondatrice de SKatalyst AI, spécialisée dans l’orchestration d’IA, le context engineering et les systèmes à base d’agents. Sa pratique associe des expériences sur l’autonomie des agents au développement logiciel avec des agents de programmation IA de pointe.'), S['body']))
    story += [sec(t('AI Engineering Practice', 'KI-Engineering-Praxis', 'Pratique de l’ingénierie IA'))]
    story.append(Paragraph(t('Build and experiment with agent workflows, tool contracts and persistent context. Use frontier AI coding agents to implement and iterate on software, with architecture, code review, testing and validation guiding the work.'), S['body']))
    story += [sec(t('Professional experience'))]
    roles = [
        (t('Senior Big Data & Business Intelligence Engineer'), f'Electrolux · {germany} · {span("Sep", 2020)}', [
            t('Develop enterprise analytics and business intelligence capabilities for industrial decision support.', 'Entwicklung von Enterprise-Analytics- und Business-Intelligence-Lösungen zur Entscheidungsunterstützung im industriellen Umfeld.', 'Développement de capacités d’analytique et de business intelligence d’entreprise pour l’aide à la décision industrielle.'),
            t('Build and maintain large-scale data processing and governed analytical workflows.', 'Aufbau und Betrieb großskaliger Datenverarbeitung und kontrollierter analytischer Workflows.', 'Conception et maintenance de traitements de données à grande échelle et de workflows analytiques gouvernés.'),
            t('Apply predictive modeling to forecasting, optimization, and pattern discovery.', 'Einsatz prädiktiver Modelle für Prognosen, Optimierung und Mustererkennung.', 'Application de la modélisation prédictive à la prévision, à l’optimisation et à la détection de tendances.'),
            t('Contribute to AI automation and structured technical reporting.', 'Mitarbeit an KI-Automatisierung und strukturiertem technischem Reporting.', 'Contribution à l’automatisation par l’IA et à un reporting technique structuré.')]),
        (t('Big Data Analyst', 'Big-Data-Analystin', 'Analyste Big Data'), f'Electrolux · {germany} · {span("Sep", 2019, "Aug", 2020)}', [
            t('Developed dashboards for consumer feedback and product-performance analysis.', 'Entwicklung von Dashboards zur Analyse von Kundenfeedback und Produktleistung.', 'Création de tableaux de bord pour l’analyse des retours consommateurs et de la performance produit.'),
            t('Processed heterogeneous datasets for business intelligence and reporting.', 'Aufbereitung heterogener Datensätze für Business Intelligence und Reporting.', 'Traitement de jeux de données hétérogènes pour la business intelligence et le reporting.'),
            t('Supported predictive modeling and data-driven decision support.', 'Unterstützung bei prädiktiver Modellierung und datengestützter Entscheidungsfindung.', 'Appui à la modélisation prédictive et à l’aide à la décision fondée sur les données.')]),
        (t('Data Scientist', 'Data Scientist', 'Data Scientist'), f'DomElec · {tunisia} · {span("Feb", 2017, "Jul", 2019)}', [
            t('Developed forecasting and predictive models for operational planning.', 'Entwicklung von Prognose- und Vorhersagemodellen für die operative Planung.', 'Développement de modèles de prévision et de prédiction pour la planification opérationnelle.'),
            t('Applied statistical and machine-learning methods to engineering and business questions.', 'Anwendung statistischer Verfahren und maschinellen Lernens auf technische und geschäftliche Fragestellungen.', 'Application de méthodes statistiques et de machine learning à des questions d’ingénierie et de gestion.'),
            t('Integrated heterogeneous sources for analytics and decision support.', 'Integration heterogener Datenquellen für Analytik und Entscheidungsunterstützung.', 'Intégration de sources hétérogènes pour l’analytique et l’aide à la décision.')]),
    ]
    for name, meta, points in roles:
        story.append(KeepTogether([Paragraph(name, S['h3']), Paragraph(meta, S['meta']), *[Paragraph(p, S['bullet'], bulletText='•') for p in points], Spacer(1, 3 * mm)]))
    story += [NextPageTemplate('second'), PageBreak()]

    # ---- Page 2, sidebar
    story += [ssec(t('Writing'))]
    story.append(side_item('Context Engineering Is the New Prompt Engineering', 'VibeKode · ' + {'en': 'October 2026', 'de': 'Oktober 2026', 'fr': 'octobre 2026'}[lang], t('Published', 'Veröffentlicht', 'Publié'), 'https://vibekode.it/blog/context-engineering-enterprise-ai-agents/'))
    story.append(side_item('From Context-Aware Ingestion to Governed Output', '', t('In progress')))
    story.append(side_item('Reliable AI Agents Need Boundaries', '', t('In progress')))
    story.append(side_item('The Subconscious Architect', t('Book', 'Buch', 'Livre'), t('Publication in preparation'), 'https://sindakhenine.com/book'))
    story += [ssec(t('Research direction', 'Forschungsrichtung', 'Axe de recherche'))]
    story.append(side_item(t('Planned PhD Research'), f"{t('Expected start:')} Q4 2026<br/>{t('Reliable enterprise AI, context engineering, data governance, and agent systems.')}", t('Planned')))
    story += [ssec(t('Links', 'Links', 'Liens'))]
    story += contact(t('AI project case studies', 'Fallstudien zu KI-Projekten', 'Études de cas des projets IA'), 'sindakhenine.com/projects', 'https://sindakhenine.com/projects')
    story += contact(t('MLcon speaker profile', 'MLcon-Speakerprofil', 'Profil de conférencière MLcon'), 'mlconference.ai', 'https://mlconference.ai/speaker/sinda-khenine/')
    story += contact(t('Code', 'Code', 'Code'), *LINKS['github'])
    story += contact(t('Email', 'E-Mail', 'E-mail'), EMAIL, f'mailto:{EMAIL}')
    story.append(FrameBreak())

    # ---- Page 2, main
    story += [sec(t('Selected AI projects', 'Ausgewählte KI-Projekte', 'Projets IA sélectionnés'))]
    story.append(item('Fistbump', t('Creator, product design and engineering. A live web app to follow AI news, model releases and research from the original sources, try community apps and find hackathons and events to learn by doing.') + ' React, TypeScript, Expo, Supabase.', 'Live · fistbump.world', 'https://fistbump.world/'))
    story.append(item('SKatalyst AI', t('Founder, AI architecture and engineering. An agentic platform for structured context and customer-owned applications, with human approval gates and data-derived validation. Private Beta.'), 'Private Beta · skatalystai.com', 'https://sindakhenine.com/projects/skatalyst-ai'))
    story.append(item('One-Person AI Company', t('Designed and ran a 24-hour agent orchestration experiment with validated decisions, claim verification and persistent event logs. Final synthesis at T+24h with three human interventions. Local experiment.'), local, 'https://sindakhenine.com/projects/one-person-ai-company'))
    story.append(item('Grok Arena', t('Ten agent roles, 30 role-scoped MCP tools and an orchestrator with persistent sessions. A seven-agent run executed the council chain; a full external-agent match remains unproven. Local experiment.'), local, 'https://sindakhenine.com/projects/grok-arena'))
    story.append(item(t('Context Engineering & Document Understanding', 'Context Engineering & Dokumentenverständnis', 'Context engineering et compréhension de documents'), t(
        'Research and conference practice on retrieval, source quality, permissions, provenance and evaluation, alongside modular OCR, extraction validation and human review.',
        'Forschung und Konferenzpraxis zu Retrieval, Quellenqualität, Berechtigungen, Herkunftsnachweis und Evaluierung, ergänzt durch modulare OCR, Extraktionsvalidierung und menschliche Prüfung.',
        'Recherche et pratique en conférence sur la recherche d’information, la qualité des sources, les permissions, la provenance et l’évaluation, ainsi que l’OCR modulaire, la validation d’extraction et la revue humaine.'),
        t('Research and practice', 'Forschung und Praxis', 'Recherche et pratique')))
    story.append(item('Reha', t('A prototype I built from a patient’s perspective: therapy times, rooms, meals and what to bring, all in one weekly plan. It includes views for patients, therapists and administrators. Presented to rehabilitation organizations; never used in clinical care.'), t('Prototype'), 'https://sindakhenine.com/projects/reha'))
    story.append(item('The Magical Book', t('A browser experiment where an illustrated book opens onto ten ancient civilizations. I combined generated video with mouse interactions and scene transitions to see how much of a place a browser could convey.'), t('Creative technology experiment', 'Kreativtechnologie-Experiment', 'Expérience de technologie créative'), 'https://sindakhenine.com/projects/the-magical-book'))
    story += [sec(t('Speaking'))]
    berlin = {'en': 'Berlin', 'de': 'Berlin', 'fr': 'Berlin'}[lang]; munich = {'en': 'Munich', 'de': 'München', 'fr': 'Munich'}[lang]
    talks = [
        (f'MLcon {berlin} 2026', ['Context Engineering Is the New Prompt Engineering: Practical Patterns for Reliable Enterprise AI Agents', 'From Answering to Acting: Engineering Reliable Autonomous Enterprise Agents']),
        (f'MLcon {munich} 2026', ['From Models to Minds: Bridging Traditional ML with Agentic AI']),
        (f'MLcon {berlin} 2025', ['Unlocking Strategic Insight with Unified Data Repositories and AI Copilots']),
        (f'MLcon {munich} 2025', ['Leveraging Unified Data Repositories and AI Copilots for Strategic Optimization', 'AMA Session with the ML Experts']),
    ]
    for event, sessions in talks:
        story.append(KeepTogether([Paragraph(event, S['h3']), *[Paragraph(esc(x), S['bullet'], bulletText='•') for x in sessions], Spacer(1, 2.2 * mm)]))

    doc.build(story)
    photo.unlink(missing_ok=True)
    return out, doc.page


if __name__ == '__main__':
    for language in FILES:
        path, pages = build(language)
        assert pages == 2, f'{path.name}: expected 2 pages, got {pages}'
        print(path.relative_to(ROOT), pages, 'pages')
