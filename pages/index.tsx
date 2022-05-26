export default function Home() {

  function handleSearch(event) {

  }

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input type="text" />
        <button type="submit">Buscar</button>
      </form>
    </div>
  )
}
