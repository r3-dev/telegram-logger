import Pocketbase from 'pocketbase'

async function initPocketbase(): Promise<Pocketbase> {
  const pb = new Pocketbase('http://127.0.0.1:8090')

  try {
    await pb.admins.authWithPassword(
      import.meta.env.POCKETBASE_LOGIN,
      import.meta.env.POCKETBASE_PASSWORD
    )
  } catch (err) {
    console.error(err)
  }

  return pb
}

export const pb = await initPocketbase()
