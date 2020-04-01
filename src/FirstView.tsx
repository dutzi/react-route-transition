import React from 'react';
import { useTransitionHistory } from 'react-route-transition';
import { useTransition } from 'react-route-transition';
import gsap, { Back } from 'gsap';

export default () => {
  const history = useTransitionHistory();

  useTransition({
    handlers: [
      {
        path: '/',
        onLeave: async () => {
          await gsap.timeline().to('[data-content] > *', {
            x: -40,
            opacity: 0,
            stagger: 0.125,
            duration: 0.5,
          });
        },
      },
      {
        path: '/',
        onEnter: async () => {
          await gsap.timeline().fromTo(
            '[data-content] > *',
            { x: -40, opacity: 0 },
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
        <h1>React Route Transition</h1>
        <h2>A simple and tiny transition orchestrator for React.</h2>
        <p>This website demonstrates react-route-transition</p>
        <a href="/mid" onClick={handleNavigate}>
          Go To Next Page
        </a>
      </div>
    </div>
  );
};
