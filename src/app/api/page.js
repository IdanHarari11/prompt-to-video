import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Video Creation App</h1>
      <Link href="/create-video">
        <a>Create a Video</a>
      </Link>
    </div>
  );
}