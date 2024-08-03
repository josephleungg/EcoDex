'use client'; // Ensure this is at the top of the file

export default function HistoryItem({ params }) {
  const { id, name } = params;

  // this is how to access this dynamic page
  //  <Link href="/history/1?name=John%20Doe">
  //    <p>User 2</p>
  //  </Link>
  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {id}</p>
      <p>User Name: {name}</p>
    </div>
  );
}
