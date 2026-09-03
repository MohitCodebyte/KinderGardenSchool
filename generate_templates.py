import os
from bs4 import BeautifulSoup

mapping = {
    'homepage.html': ('index.html', 'Homepage', 'Apna School Ka Naam - Playful Preschool Learning'),
    'about_us.html': ('about.html', 'About Us', 'About Us - Apna Brand Name'),
    'our_programs.html': ('programs.html', 'Our Programs', 'Our Preschool Programs | Apna Brand Name'),
    'senior_kg.html': ('senior_kg.html', 'Senior KG', 'Senior KG Program - Apna Brand Name'),
    'admissions.html': ('admissions.html', 'Admissions', 'Admissions - Apna Brand Name'),
    'franchise.html': ('franchise.html', 'Franchise', 'Franchise - Apna Brand Name'),
    'branches.html': ('branches.html', 'Branches', 'Find a Branch - Apna Brand Name'),
    'media.html': ('media.html', 'Media', 'Media - Apna Brand Name'),
    'stories.html': ('stories.html', 'Stories', 'Stories & Parenting Tips - Apna Brand Name'),
    'contact_us.html': ('contact.html', 'Contact', 'Contact Us - Apna Brand Name'),
    'careers.html': ('careers.html', 'Careers', 'Careers - Apna Brand Name')
}

for src_name, (target_name, name_key, title_str) in mapping.items():
    src_path = os.path.join('stitch_raw', src_name)
    target_path = os.path.join('templates', target_name)
    
    with open(src_path, 'r', encoding='utf-8') as fp:
        html_content = fp.read()
    
    soup = BeautifulSoup(html_content, 'html.parser')
    body = soup.find('body') or soup
    
    # Remove tailwind script tags if found in body
    for s in body.find_all('script'):
        if 'tailwindcss' in str(s) or 'tailwind.config' in str(s):
            s.decompose()
            
    # Extract nav/header and footer
    nav = body.find('nav') or body.find('header')
    if nav:
        nav.decompose()
        
    footer = body.find('footer')
    if footer:
        footer.decompose()
        
    inner_html = ''.join(str(child) for child in body.children if str(child).strip())
    
    template_content = f"""{{% extends "base.html" %}}

{{% block title %}}{title_str}{{% endblock %}}

{{% block content %}}
{inner_html}
{{% endblock %}}
"""
    
    with open(target_path, 'w', encoding='utf-8') as out:
        out.write(template_content)
        
    print(f"Generated {target_name} ({len(template_content)} bytes)")

print("All 11 Jinja2 templates created successfully!")
