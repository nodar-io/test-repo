import { useUnit } from 'effector-react';
import { $userRepo, getUserFx } from './model';
import { Link } from 'atomic-router-react';

export const CardPage = () => {
  const [repoData, loading] = useUnit([$userRepo, getUserFx.pending]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{repoData?.repository?.name}</h1>
      <p>
        Stars: {repoData?.repository?.stargazerCount}
        <span style={{ color: 'gold' }}>★</span>
      </p>
      <p>
        Last Commit Date: {new Date(String(repoData?.repository?.updatedAt)).toLocaleDateString()}
      </p>
      {repoData?.repository?.owner && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            src={repoData?.repository?.owner.avatarUrl}
            alt={`${repoData?.repository?.owner.login}'s avatar`}
          />
          <a href={repoData?.repository?.owner.url}>{repoData?.repository?.owner.login}</a>
        </div>
      )}
      <p>
        Languages:{' '}
        {repoData?.repository?.languages.nodes.map((lang) => (
          <div
            key={lang.name}
            style={{ color: lang.color, display: 'inline', paddingRight: '5px' }}
          >
            {lang.name}
          </div>
        ))}
      </p>
      <p>Description: {repoData?.repository?.description}</p>
      <Link to={'/'} params={{ login: repoData?.repository?.owner?.login || '', after: null }}>
        <button>Назад на главную</button>
      </Link>
    </div>
  );
};
