# usage: [JEE_SUBJECT=Chemistry] python scripts/notes-pipeline/jee/register.py <route-slug> <CONST_PREFIX> "<Chip label>" <AFTER_CONST_PREFIX>
import sys
slug, pre, chip, after = sys.argv[1:5]
import os
SUBJECT = os.environ.get('JEE_SUBJECT', 'Maths')
ROUTE, DISPLAY = {'Maths': ('jee-mains-maths', 'JEE Mains Maths'),
                  'Physics': ('jee-mains-physics', 'JEE Mains Physics'),
                  'Chemistry': ('jee-mains-chemistry', 'JEE Mains Chemistry')}[SUBJECT]
import os
p=os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'src', 'lib', 'notes', 'chapters.ts')
s=open(p,encoding='utf8').read()
imp_anchor=None
import re
m=[x for x in re.finditer(r'import \{\n  '+after+r'_CHAPTER,\n  '+after+r'_NOTES,\n  '+after+r'_SLUGS,\n\} from "[^"]+";\n', s)]
assert len(m)==1, 'import anchor'
a=m[0].group(0)
s=s.replace(a, a+'import {\n  %s_CHAPTER,\n  %s_NOTES,\n  %s_SLUGS,\n} from "@/app/notes/%s/%s/_data";\n'%(pre,pre,pre,ROUTE,slug))
b='    slugs: %s_SLUGS,\n  },\n'%after
assert s.count(b)==1, 'reg anchor'
s=s.replace(b, b+'''  {
    examName: "JEE Mains",
    subjectName: "%s",
    subjectRoute: "%s",
    subjectDisplay: "%s",
    chapterSlug: "%s",
    chipLabel: "%s",
    chapter: %s_CHAPTER,
    notes: %s_NOTES,
    slugs: %s_SLUGS,
  },
'''%(SUBJECT,ROUTE,DISPLAY,slug,chip,pre,pre,pre))
open(p,'w',encoding='utf8',newline='').write(s)
print('registered',slug)
