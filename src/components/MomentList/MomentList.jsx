// src/components/MomentList/MomentList.jsx
import { Link } from 'react-router-dom'

const MomentList = (props) => {
  return (
    <main>
      {props.moments.map((moment) => (
        <Link key={moment._id} to={`/moments/${moment._id}`}>
          <article>
            <header>
              <h2>{moment.title}</h2>
              <p>
                {moment.createdBy.username} posted on 
                {new Date(moment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{moment.text}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default MomentList;