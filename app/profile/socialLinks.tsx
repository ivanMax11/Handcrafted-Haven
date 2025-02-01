"use client";
interface SocialLinksProps {
  socialLinks: { platform: string; url: string }[];
  addSocialLink: () => void;
  updateSocialLink: (index: number, key: "platform" | "url", value: string) => void;
  removeSocialLink: (index: number) => void;
}

export default function SocialLinks({
  socialLinks,
  addSocialLink,
  updateSocialLink,
  removeSocialLink
}: SocialLinksProps) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-700">Social Links</h3>
      {socialLinks.map((link, index) => (
        <div key={index} className="flex space-x-2 mt-2">
          <input
            type="text"
            placeholder="Platform (e.g. Instagram)"
            value={link.platform}
            onChange={(e) => updateSocialLink(index, "platform", e.target.value)}
            className="flex-1 border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            placeholder="URL"
            value={link.url}
            onChange={(e) => updateSocialLink(index, "url", e.target.value)}
            className="flex-1 border border-gray-300 p-2 rounded"
          />
          <button
            onClick={() => removeSocialLink(index)}
            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-400"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={addSocialLink}
        className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 transition"
      >
        + Add Link
      </button>
    </div>
  );
}
