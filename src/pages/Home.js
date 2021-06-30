import { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Grid, TransitionGroup } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import "../App.css";
import PostForm from "../components/PostForm";
import { AuthContext } from "../context/authContext";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const Home = () => {
  const { loading, data: data } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);

  console.log(data);
  return (
    <div>
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        <Grid.Row>
          {loading ? (
            <h1>loading posts ..</h1>
          ) : (
            <TransitionGroup>
              {data &&
                data.getPosts.map(post => {
                  return (
                    <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                      <PostCard post={post} />
                    </Grid.Column>
                  );
                })}
            </TransitionGroup>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
