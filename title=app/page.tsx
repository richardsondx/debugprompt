  const filteredPrompts = prompts.filter((prompt: Prompt) => {
    const matchesCategory = !selectedCategory || prompt.category === selectedCategory
    const matchesModel =
      selectedModels.length === 0 ||
      selectedModels.some((selected) =>
        Array.isArray(prompt.model)
          ? prompt.model.includes(selected)
          : prompt.model === selected
      )
    const matchesSearch = searchQuery === "" || prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesModel && matchesSearch
  }) 