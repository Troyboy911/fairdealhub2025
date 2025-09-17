'use client'

import { useState } from 'react'

export default function Admin() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [affiliates, setAffiliates] = useState([
    { id: 1, name: 'Affiliate 1', apiKey: 'key1', active: true },
    { id: 2, name: 'Affiliate 2', apiKey: 'key2', active: false },
  ])
  const [newAffiliate, setNewAffiliate] = useState({ name: '', apiKey: '' })
  const [agentCommand, setAgentCommand] = useState('')
  const [agentResponse, setAgentResponse] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') { // Placeholder password
      setIsAuthenticated(true)
    } else {
      alert('Invalid password')
    }
  }

  const addAffiliate = () => {
    if (newAffiliate.name && newAffiliate.apiKey) {
      setAffiliates([...affiliates, { id: Date.now(), ...newAffiliate, active: true }])
      setNewAffiliate({ name: '', apiKey: '' })
    }
  }

  const removeAffiliate = (id: number) => {
    setAffiliates(affiliates.filter(a => a.id !== id))
  }

  const toggleAffiliate = (id: number) => {
    setAffiliates(affiliates.map(a => a.id === id ? { ...a, active: !a.active } : a))
  }

  const executeAgentCommand = async () => {
    const command = agentCommand.trim().toLowerCase()
    if (command.startsWith('add affiliate')) {
      const parts = command.split(' ')
      if (parts.length >= 4) {
        const name = parts.slice(2, -1).join(' ')
        const apiKey = parts[parts.length - 1]
        setAffiliates([...affiliates, { id: Date.now(), name, apiKey, active: true }])
        setAgentResponse(`Affiliate "${name}" added with API key "${apiKey}".`)
      } else {
        setAgentResponse('Invalid command. Use: add affiliate [name] [api_key]')
      }
    } else if (command.startsWith('remove affiliate')) {
      const parts = command.split(' ')
      if (parts.length === 3) {
        const id = parseInt(parts[2])
        setAffiliates(affiliates.filter(a => a.id !== id))
        setAgentResponse(`Affiliate with ID ${id} removed.`)
      } else {
        setAgentResponse('Invalid command. Use: remove affiliate [id]')
      }
    } else if (command === 'update brands') {
      try {
        const response = await fetch('/api/update-brands', { method: 'POST', body: JSON.stringify({ action: 'update' }) })
        const result = await response.json()
        setAgentResponse(`Brands updated: ${result.message}`)
      } catch (error) {
        setAgentResponse('Failed to update brands.')
      }
    } else if (command === 'update products') {
      try {
        const response = await fetch('/api/update-products', { method: 'POST', body: JSON.stringify({ action: 'update' }) })
        const result = await response.json()
        setAgentResponse(`Products updated: ${result.message}`)
      } catch (error) {
        setAgentResponse('Failed to update products.')
      }
    } else if (command === 'list affiliates') {
      const list = affiliates.map(a => `${a.id}: ${a.name} (${a.active ? 'Active' : 'Inactive'})`).join('\n')
      setAgentResponse(`Affiliates:\n${list}`)
    } else {
      setAgentResponse('Unknown command. Available commands: add affiliate [name] [api_key], remove affiliate [id], update brands, update products, list affiliates')
    }
    setAgentCommand('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      {/* Affiliate Management */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Affiliate Management</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Affiliate Name"
            value={newAffiliate.name}
            onChange={(e) => setNewAffiliate({ ...newAffiliate, name: e.target.value })}
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <input
            type="text"
            placeholder="API Key"
            value={newAffiliate.apiKey}
            onChange={(e) => setNewAffiliate({ ...newAffiliate, apiKey: e.target.value })}
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <button onClick={addAffiliate} className="bg-green-500 text-white px-4 py-2 rounded">Add Affiliate</button>
        </div>
        <ul>
          {affiliates.map(affiliate => (
            <li key={affiliate.id} className="flex items-center justify-between p-2 border-b">
              <span>{affiliate.name} - {affiliate.apiKey} - {affiliate.active ? 'Active' : 'Inactive'}</span>
              <div>
                <button onClick={() => toggleAffiliate(affiliate.id)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  {affiliate.active ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => removeAffiliate(affiliate.id)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Agent */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Agent</h2>
        <div className="mb-4">
          <input
            type="text"
            value={agentCommand}
            onChange={(e) => setAgentCommand(e.target.value)}
            placeholder="Enter command (e.g., add affiliate Amazon key123)"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button onClick={executeAgentCommand} className="bg-blue-500 text-white px-4 py-2 rounded">Execute</button>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-2">Response:</h3>
          <pre className="whitespace-pre-wrap">{agentResponse}</pre>
        </div>
      </section>

      {/* Analytics Placeholder */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Analytics</h2>
        <p>Sales: 1000</p>
        <p>Clicks: 5000</p>
        {/* Placeholder for real analytics */}
      </section>

      {/* Settings */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <p>Update site settings here.</p>
        {/* Placeholder for settings */}
      </section>
    </div>
  )
}
