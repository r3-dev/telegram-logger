export default function Home() {
  function request() {
    fetch('/api/hello')
  }

  return (
    <div>
      <button onClick={request}>ERROR</button>
    </div>
  )
}
