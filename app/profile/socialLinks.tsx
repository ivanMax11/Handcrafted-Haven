'use client'
import { useState } from 'react'

type SocialLink = {
  platform: string
  url: string
}

type SocialLinksProps = {
  links: SocialLink[]
}

const SocialLinks = ({ links }: SocialLinksProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [socialLinks, setSocialLinks] = useState(links)

  const handleChange = (index: number, field: keyof SocialLink, value: string) => {
    const updatedLinks = [...socialLinks]
    updatedLinks[index][field] = value
    setSocialLinks(updatedLinks)
  }

  const handleAddLink = () => {
    setSocialLinks([...socialLinks, { platform: '', url: '' }])
  }

  const handleDeleteLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index))
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Social Links</h3>

      {isEditing ? (
        <div className="space-y-3">
          {socialLinks.map((link, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Plataforma (Ej: Twitter)"
                value={link.platform}
                onChange={(e) => handleChange(index, 'platform', e.target.value)}
                className="border p-2 rounded w-1/3"
              />
              <input
                type="url"
                placeholder="URL"
                value={link.url}
                onChange={(e) => handleChange(index, 'url', e.target.value)}
                className="border p-2 rounded w-2/3"
              />
              <button onClick={() => handleDeleteLink(index)} className="text-red-500">🗑</button>
            </div>
          ))}

          <button onClick={handleAddLink} className="bg-blue-500 text-white px-3 py-1 rounded">
            + Agregar Link
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-green-500 text-white px-3 py-1 rounded">
            Guardar
          </button>
        </div>
      ) : (
        <div>
          {socialLinks.length > 0 ? (
            socialLinks.map((link, index) => (
              <p key={index} className="text-blue-600">
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.platform}
                </a>
              </p>
            ))
          ) : (
            <p className="text-gray-500">No hay enlaces sociales.</p>
          )}

          <button onClick={() => setIsEditing(true)} className="mt-2 text-blue-500">
            ✏️ Editar
          </button>
        </div>
      )}
    </div>
  )
}

export default SocialLinks
