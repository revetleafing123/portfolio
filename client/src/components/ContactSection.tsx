// Split Signal reminder: the final surface should make contact feel immediate and human, with no decorative friction.
// Split Signal footer: keep privacy access visible beside social proof without interrupting the warm editorial contact surface.
import { useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { RaisedButton } from "@/components/RaisedButton";

// Same neumorphic recipe used in DynamicTiles: fields/button share the
// SECTION's own background (#e9dfcf) rather than a different-colored fill
// — depth comes entirely from the dual soft shadow, not from contrast in
// fill color. Inputs are recessed (inset shadow, "pressed into" the page);
// the submit button is raised (outer shadow), matching tile conventions.
const NEO_BASE_BG = "#e9dfcf";
const NEO_BASE_BUTTON_BG = "#4a3f2d";

// Layered like a real carved groove: a SHARP thin edge (the lip of the
// recess) plus a wider SOFT ambient shadow (the depth falloff). A single
// soft pair alone reads as "slightly shaded," not "carved in" — it needs
// both a crisp near edge and a diffuse far one, same trick used for real
// bevels elsewhere on this site.
const neoFieldStyle: React.CSSProperties = {
  backgroundColor: NEO_BASE_BG,
  boxShadow: [
    "inset 1px 1px 1px rgba(120,105,75,0.55)", // sharp dark lip, top-left
    "inset -1px -1px 1px rgba(255,255,255,0.9)", // sharp light lip, bottom-right
    "inset 4px 4px 9px rgba(120,105,75,0.3)", // soft ambient dark
    "inset -4px -4px 9px rgba(255,255,255,0.55)", // soft ambient light
  ].join(", "),
};

const neoButtonStyle: React.CSSProperties = {
  backgroundColor: NEO_BASE_BUTTON_BG,
  boxShadow: [
    "6px 6px 12px rgba(185, 169, 139, 0.4)",
    "-4px -4px 12px rgba(255,255,255,0.85)",
  ].join(", "),
};

const neoButtonPressedStyle: React.CSSProperties = {
  backgroundColor: NEO_BASE_BG,
  boxShadow: [
    "inset 4px 4px 8px rgba(163,150,124,0.4)",
    "inset -4px -4px 8px rgba(255,255,255,0.7)",
  ].join(", "),
};

export function ContactSection() {
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    const body = encodeURIComponent(message.trim() ? `From: ${contact}\n\n${message}` : `From: ${contact}`);
    window.location.href = `mailto:rishebs123456@gmail.com?subject=Portfolio Contact&body=${body}`;
  };

  return (
    <section className="py-24 sm:py-32 bg-[#e9dfcf]" id="contact">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.68fr] lg:items-end lg:gap-24">
          <div>
            <p className="eyebrow">OPEN CHANNEL</p>
            <h2 className="display-title mt-6 text-[clamp(2.5rem,6vw,6rem)] tracking-[-0.04em] text-[#1f1d1a]">
              Have a useful problem?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#1f1d1a]/60">
              Tell me what you&apos;re building, what is stuck, or what needs a better system behind it.
            </p>
          </div>

          <div className="lg:pb-2">
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1f1d1a]/70" htmlFor="contact-input">
                  Contact
                </label>
                <Input
                  id="contact-input"
                  type="text"
                  placeholder="email / phone"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="!h-12 !rounded-[6px] !border !border-black/15 !px-4 !text-sm !text-[#1f1d1a] !appearance-none !placeholder:text-[#1f1d1a]/30 placeholder:![text-shadow:none] focus-visible:!ring-0 focus-visible:!ring-offset-0 [text-shadow:1px_1px_0_rgba(255,255,255,0.85),-1px_-1px_1px_rgba(120,105,75,0.45)]"
                  style={neoFieldStyle}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1f1d1a]/70" htmlFor="message-input">
                  Message <span className="text-[#1f1d1a]/40">(optional)</span>
                </label>
                <textarea
                  id="message-input"
                  placeholder="Tell me about your project..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="!w-full !rounded-[6px] !border !border-black/15 !px-4 !py-3 !text-sm !text-[#1f1d1a] !placeholder:text-[#1f1d1a]/30 placeholder:![text-shadow:none] resize-none [text-shadow:1px_1px_0_rgba(255,255,255,0.85),-1px_-1px_1px_rgba(120,105,75,0.45)]"
                  style={neoFieldStyle}
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded-[6px] border border-black/15 py-3 text-sm font-semibold text-white/80 transition-all duration-200 active:scale-[0.98]"
                style={buttonPressed ? neoButtonPressedStyle : neoButtonStyle}
                onMouseDown={() => setButtonPressed(true)}
                onMouseUp={() => setButtonPressed(false)}
                onMouseLeave={() => setButtonPressed(false)}
                onTouchStart={() => setButtonPressed(true)}
                onTouchEnd={() => setButtonPressed(false)}
              >
                Send message
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#1f1d1a]/50">© {new Date().getFullYear()} Rishebs. Built with intent.</p>
          <div className="flex items-center gap-3">
            <RaisedButton
              size="md"
              iconOnly
              variant="mauve-brown"
              aria-label="GitHub"
              href="https://github.com/rishebss"
              rel="noreferrer"
              target="_blank"
            >
              <FaGithub aria-hidden="true" size={18} className="text-[#f4f0e8]" />
            </RaisedButton>
            <RaisedButton
              size="md"
              iconOnly
              variant="mauve-brown"
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/risheb-s-b46a40289"
              rel="noreferrer"
              target="_blank"
            >
              <FaLinkedinIn aria-hidden="true" size={18} className="text-[#f4f0e8]" />
            </RaisedButton>
            <a className="ml-3 text-xs text-[#1f1d1a]/50 transition-colors hover:text-[#1f1d1a] self-center" href={`${import.meta.env.BASE_URL}disclaimer`}>Disclaimer</a>
            <a className="text-xs text-[#1f1d1a]/50 transition-colors hover:text-[#1f1d1a] self-center" href="#top">Back to top <span aria-hidden="true">↑</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}