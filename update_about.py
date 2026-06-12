import re

file_path = r'C:\Users\ruben\Documents\Porfolio site\src\App.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_about = '''function About() {
  return (
    <section id="about" style={{ padding: "5rem 3rem", background: COLORS.bg }}>
      <FadeIn>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start", marginBottom: "3rem" }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ ...head, fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: COLORS.hi, margin: "0 0 1.2rem 0" }}>
                Why hello there!
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p style={{ color: COLORS.dim, fontSize: 15, lineHeight: 1.75, margin: 0 }}>
                  I enjoy the pursuit of craft, solving complex problems, and mentoring others. Security isn't just a field—it's a puzzle I'm obsessed with solving.
                </p>
                <p style={{ color: COLORS.dim, fontSize: 15, lineHeight: 1.75, margin: 0 }}>
                  I'm inquisitive by nature and love exploring this beautiful world of defensive techniques and attack patterns. I also enjoy hands-on projects that challenge my current understanding.
                </p>
                <p style={{ color: COLORS.dim, fontSize: 15, lineHeight: 1.75, margin: 0 }}>
                  Outside of work I enjoy travel, hiking, photography, and expanding my toolkit of technical skills.
                </p>
              </div>
            </div>

            <div style={{ flex: 0.5, display: "flex", justifyContent: "flex-end" }}>
              <div style={{ width: 140, height: 140, borderRadius: 16, overflow: "hidden", border: `4px solid ${COLORS.bg2}`, boxShadow: "0 8px 20px rgba(1,10,30,0.5)", flexShrink: 0 }}>
                <img src={PHOTO1} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", paddingTop: "2rem", borderTop: `1px solid ${COLORS.border}` }}>
            <div>
              <div style={{ ...mono, fontSize: 11, color: COLORS.accent, letterSpacing: "0.06em", marginBottom: "0.6rem", textTransform: "uppercase" }}>Location</div>
              <div style={{ color: COLORS.hi, fontSize: 15, fontWeight: 500 }}>Kanjirappally, Kerala</div>
            </div>
            <div>
              <div style={{ ...mono, fontSize: 11, color: COLORS.accent, letterSpacing: "0.06em", marginBottom: "0.6rem", textTransform: "uppercase" }}>Education</div>
              <div style={{ color: COLORS.hi, fontSize: 15, fontWeight: 500 }}>B.Tech IT — S7</div>
            </div>
            <div>
              <div style={{ ...mono, fontSize: 11, color: COLORS.accent, letterSpacing: "0.06em", marginBottom: "0.6rem", textTransform: "uppercase" }}>Superpower</div>
              <div style={{ color: COLORS.hi, fontSize: 15, fontWeight: 500 }}>Lab environment design</div>
            </div>
            <div>
              <div style={{ ...mono, fontSize: 11, color: COLORS.accent, letterSpacing: "0.06em", marginBottom: "0.6rem", textTransform: "uppercase" }}>Reading</div>
              <div style={{ color: COLORS.dim, fontSize: 14 }}>Security research & CTF writeups</div>
            </div>
            <div>
              <div style={{ ...mono, fontSize: 11, color: COLORS.accent, letterSpacing: "0.06em", marginBottom: "0.6rem", textTransform: "uppercase" }}>Passion</div>
              <div style={{ color: COLORS.dim, fontSize: 14 }}>Ethical hacking & defense</div>
            </div>
            <div>
              <div style={{ ...mono, fontSize: 11, color: COLORS.accent, letterSpacing: "0.06em", marginBottom: "0.6rem", textTransform: "uppercase" }}>Spirit animal</div>
              <div style={{ color: COLORS.dim, fontSize: 14 }}>Relentless problem-solver</div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}'''

# Use regex to find and replace the About function
pattern = r'function About\(\) \{.*?^\}'
content = re.sub(pattern, new_about, content, count=1, flags=re.MULTILINE | re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated About function successfully")
