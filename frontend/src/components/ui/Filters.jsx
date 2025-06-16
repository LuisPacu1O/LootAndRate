import Input from './Input';
import SearchableSelect from './SearcheableSelect';

export default function Filters({ filters, setFilters, genres, platforms, publishers, developers }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full max-w-8xl mx-auto mb-6">
      <Input
        placeholder="Buscar juego"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <SearchableSelect
        label="Genre"
        value={filters.genre}
        onChange={(value) => setFilters({ ...filters, genre: value })}
        options={genres.map((g) => ({ label: g.name, value: g.slug }))}
      />
      <SearchableSelect
        label="Platform"
        value={filters.platform}
        onChange={(value) => setFilters({ ...filters, platform: value })}
        options={platforms.map((p) => ({ label: p.name, value: p.id.toString() }))}
      />
      <SearchableSelect
        label="Publisher"
        value={filters.publishers}
        onChange={(value) => setFilters({ ...filters, publishers: value })}
        options={publishers.map((p) => ({ label: p.name, value: p.slug }))}
      />
      <SearchableSelect
        label="Developer"
        value={filters.developers}
        onChange={(value) => setFilters({ ...filters, developers: value })}
        options={developers.map((d) => ({ label: d.name, value: d.slug }))}
      />
    </div>
  );
}
