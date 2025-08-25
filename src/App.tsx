import React, { useState, useEffect } from 'react';
import { Search, Users, MapPin, Heart } from 'lucide-react';

interface Guest {
  id: number;
  name: string;
  table: string;
}

// Mock data - in production this would come from your API
const mockGuests: Guest[] = [
  { id: 1, name: "John Smith", table: "Table 1" },
  { id: 2, name: "Mary Johnson", table: "Table 2" },
  { id: 3, name: "Robert Brown", table: "Table 1" },
  { id: 4, name: "Sarah Davis", table: "Table 3" },
  { id: 5, name: "Michael Wilson", table: "Table 2" },
  { id: 6, name: "Jennifer Miller", table: "Table 4" },
  { id: 7, name: "David Anderson", table: "Table 3" },
  { id: 8, name: "Lisa Taylor", table: "Table 5" },
  { id: 9, name: "James Thompson", table: "Table 1" },
  { id: 10, name: "Patricia White", table: "Table 4" },
  { id: 11, name: "Christopher Lee", table: "Table 6" },
  { id: 12, name: "Barbara Martinez", table: "Table 5" },
  { id: 13, name: "Daniel Garcia", table: "Table 2" },
  { id: 14, name: "Susan Rodriguez", table: "Table 7" },
  { id: 15, name: "Matthew Lopez", table: "Table 6" }
];

export default function WeddingSeatingApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Guest[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Real-time search as user types
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Simulate API delay for realistic feel
    const searchTimer = setTimeout(() => {
      const filtered = mockGuests.filter(guest =>
          guest.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(searchTimer);
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim() === '') return;

    setIsSearching(true);
    setTimeout(() => {
      const filtered = mockGuests.filter(guest =>
          guest.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-rose-100">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-center space-x-3">
              <Heart className="text-rose-500" size={32} />
              <h1 className="text-3xl font-elegant text-gray-800">Свадбено Седење</h1>
              <Heart className="text-rose-500" size={32} />
            </div>
            <p className="text-center text-gray-600 mt-2">Најди го местото за гости</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Внеси име на гостин..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:ring-4 focus:ring-rose-100 outline-none transition-all duration-200 text-lg"
                />
              </div>
              <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-8 py-4 bg-rose-500 text-white rounded-xl hover:bg-rose-600 focus:ring-4 focus:ring-rose-200 transition-all duration-200 font-medium text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Барање...</span>
                    </>
                ) : (
                    <>
                      <Search size={20} />
                      <span>Барај</span>
                    </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {searchTerm && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                    <Users size={24} />
                    <span>
                  {searchResults.length === 0 && !isSearching
                      ? 'Нема пронајдено гости'
                      : isSearching
                          ? 'Се пребарува...'
                          : `Пронајдени се ${searchResults.length} гост${searchResults.length !== 1 ? 'и' : 'ин'}`
                  }
                </span>
                  </h2>
                </div>

                {isSearching ? (
                    <div className="p-12 text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
                      <p className="text-gray-600">Се пребаруваат гости...</p>
                    </div>
                ) : searchResults.length === 0 ? (
                    <div className="p-12 text-center">
                      <Users className="mx-auto mb-4 text-gray-300" size={48} />
                      <p className="text-gray-600 text-lg">Нема гости со името "{searchTerm}"</p>
                      <p className="text-gray-500 mt-2">Обиди се со друго име или различен правопис</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                      {searchResults.map((guest) => (
                          <div
                              key={guest.id}
                              className="p-6 hover:bg-gray-50 transition-colors duration-150"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                                  <Users className="text-rose-600" size={24} />
                                </div>
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-900">
                                    {guest.name}
                                  </h3>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 bg-rose-50 px-4 py-2 rounded-lg">
                                <MapPin className="text-rose-600" size={20} />
                                <span className="text-rose-800 font-semibold text-lg">
                                  {guest.table}
                                </span>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                )}
              </div>
          )}

          {/* Instructions */}
          {!searchTerm && (
              <div className="text-center mt-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                  <div className="text-6xl mb-4">🎊</div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Добредојдовте во Свадбено Седење
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Едноставно внесете го името на гостин во полето за пребарување за да ја најдете неговата маса.
                    Можете да пребарувате по име, презиме или дел од името - ќе ви ги прикажеме сите совпаѓања!
                  </p>
                  <div className="mt-6 text-sm text-gray-500">
                    <p>💡 Совет: Започнете со внесување и резултатите ќе се појават автоматски</p>
                  </div>
                </div>
              </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-4xl mx-auto px-4 py-6 text-center">
            <p className="text-gray-500">Создадено со ❤️ за вашиот специјален ден</p>
          </div>
        </div>
      </div>
  );

}