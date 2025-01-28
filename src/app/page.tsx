import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Video Creation App</h1>
      <Link href="/create-video">
        Create a Video
      </Link>
      <Link href="/create-pictures">
        Create a pictures
      </Link>
    </div>
  );
}