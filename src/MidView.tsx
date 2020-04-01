import React from 'react';
import { useTransition, useTransitionHistory } from 'react-route-transition';
import gsap from 'gsap';

export default () => {
  const history = useTransitionHistory();

  useTransition({
    handlers: [
      {
        from: '/',
        to: '/mid',
        onEnter: async () => {
          await gsap
            .timeline()
            .fromTo(
              '[data-content] > *',
              { x: 40, opacity: 0 },
              { x: 0, duration: 0.5, opacity: 1, stagger: 0.125 }
            );
        },
      },
      {
        from: '/last',
        to: '/mid',
        onEnter: async () => {
          await gsap
            .timeline()
            .fromTo(
              '[data-content] > *',
              { x: -40, opacity: 0 },
              { x: 0, duration: 0.5, opacity: 1, stagger: 0.125 }
            );
        },
      },
      {
        from: '/mid',
        to: '/',
        onLeave: async () => {
          await gsap.timeline().to('[data-content] > *', {
            x: 40,
            duration: 0.5,
            opacity: 0,
            stagger: 0.125,
          });
        },
      },
      {
        from: '/mid',
        to: '/last',
        onLeave: async () => {
          await Promise.all([
            gsap.timeline().to('[data-content] > *', {
              x: -40,
              opacity: 0,
              duration: 0.5,
              stagger: 0.125,
            }),
          ]);
        },
      },
    ],
  });

  function handleNavigateFirst(e: React.MouseEvent) {
    e.preventDefault();
    history.push('/');
  }

  function handleNavigateLast(e: React.MouseEvent) {
    e.preventDefault();
    history.push('/last');
  }

  return (
    <div className="mid">
      <div data-content className="container">
        <a href="/" className="btnPrev" onClick={handleNavigateFirst}>
          ‹ Prev
        </a>
        <div>
          <h1>I am the middle page</h1>
          <h2>
            I animate differently depending on where you take me to and where
            I'm coming from
          </h2>
        </div>
        <a href="/last" className="btnNext" onClick={handleNavigateLast}>
          Next ›
        </a>
      </div>
    </div>
  );
};
