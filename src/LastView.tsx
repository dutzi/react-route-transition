import React from 'react';
import { useTransitionHistory } from 'react-route-transition';
import { useTransition } from 'react-route-transition';
import gsap, { Back } from 'gsap';

export default () => {
  const history = useTransitionHistory();

  useTransition({
    handlers: [
      {
        path: '/last',
        onLeave: async () => {
          await gsap.timeline().to('[data-content] > *', {
            x: 40,
            opacity: 0,
            stagger: 0.125,
            duration: 0.5,
          });
        },
      },
      {
        path: '/last',
        onEnter: async () => {
          await gsap.timeline().fromTo(
            '.container > *',
            { x: 40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              stagger: 0.125,
              duration: 0.5,
            }
          );
        },
      },
    ],
  });

  function handleNavigate(e: React.MouseEvent) {
    e.preventDefault();
    history.push('/mid');
  }

  return (
    <div className="home">
      <div data-content className="container">
        <h1>You're at the last page</h1>
        <a href="/mid" onClick={handleNavigate}>
          Go To Prev Page
        </a>
      </div>
    </div>
  );
};
