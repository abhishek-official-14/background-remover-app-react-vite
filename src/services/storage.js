class StorageService {
  constructor() {
    this.prefix = 'bg_remover_'
  }

  setItem(key, value, sessionOnly = false) {
    const storage = sessionOnly ? sessionStorage : localStorage
    const item = {
      value: value,
      timestamp: Date.now()
    }
    storage.setItem(this.prefix + key, JSON.stringify(item))
  }

  getItem(key, sessionOnly = false) {
    const storage = sessionOnly ? sessionStorage : localStorage
    const item = storage.getItem(this.prefix + key)
    
    if (!item) return null
    
    try {
      const parsed = JSON.parse(item)
      return parsed.value
    } catch {
      return item
    }
  }

  removeItem(key, sessionOnly = false) {
    const storage = sessionOnly ? sessionStorage : localStorage
    storage.removeItem(this.prefix + key)
  }

  clear(sessionOnly = false) {
    const storage = sessionOnly ? sessionStorage : localStorage
    const keysToRemove = []
    
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i)
      if (key.startsWith(this.prefix)) {
        keysToRemove.push(key)
      }
    }
    
    keysToRemove.forEach(key => storage.removeItem(key))
  }

  saveProcessingHistory(imageData, resultData) {
    const history = this.getItem('history') || []
    
    history.unshift({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      originalImage: imageData,
      processedImage: resultData
    })
    
    if (history.length > 50) {
      history.pop()
    }
    
    this.setItem('history', history)
  }

  getProcessingHistory() {
    return this.getItem('history') || []
  }

  clearHistory() {
    this.removeItem('history')
  }

  saveUserPreferences(preferences) {
    const currentPrefs = this.getItem('preferences') || {}
    this.setItem('preferences', { ...currentPrefs, ...preferences })
  }

  getUserPreferences() {
    return this.getItem('preferences') || {}
  }

  saveFavoriteTemplate(template) {
    const favorites = this.getItem('favorites') || []
    
    if (!favorites.find(f => f.id === template.id)) {
      favorites.push(template)
      this.setItem('favorites', favorites)
    }
  }

  removeFavoriteTemplate(templateId) {
    const favorites = this.getItem('favorites') || []
    const updated = favorites.filter(f => f.id !== templateId)
    this.setItem('favorites', updated)
  }

  getFavoriteTemplates() {
    return this.getItem('favorites') || []
  }
}

export const storage = new StorageService()