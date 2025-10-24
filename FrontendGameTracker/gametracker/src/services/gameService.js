const mockGames = [];  // Inicializar como array vacío

export const gameService = {
  getAllGames: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockGames;
  },

  searchGames: async (searchTerm) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockGames.filter(game => 
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },

  isLibraryEmpty: async () => {
    return mockGames.length === 0;
  }
};
