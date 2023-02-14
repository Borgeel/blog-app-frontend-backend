import Post from "./Post";

function Feed({ posts }) {
  return (
    <ul style={{ marginBottom: "70px" }}>
      {posts.map((post) => {
        return <Post post={post} key={post._id} />;
      })}
    </ul>
  );
}

export default Feed;
