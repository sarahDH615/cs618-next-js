// import { revalidateTag } from 'next/cache'

export default async function TimePage() {
  //   const timeRequest = await fetch('https://worldtimeapi.org/api/timezone/UTC')
  //   const timeRequest = await fetch('https://worldtimeapi.org/api/timezone/UTC', {
  //     next: { tags: ['time'] },
  //   })
  const timeRequest = await fetch('https://worldtimeapi.org/api/timezone/UTC', {
    next: { revalidate: 10 }, // refresh every 10 seconds
    // cache: 'no-store', // no cacheing at all
  })
  const time = await timeRequest.json()
  //   revalidateTag('time')
  return <div>Current timestamp: {time?.datetime}</div>
}
