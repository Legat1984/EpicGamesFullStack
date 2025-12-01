import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipText = styled.div`
  position: fixed;
  background-color: ${props => props.theme?.card || '#333'};
  color: ${props => props.theme?.text || '#fff'};
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  white-space: nowrap;
  z-index: 10000;
  opacity: ${props => props.$isVisible ? 1 : 0};
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.2s ease, visibility 0.2s ease;
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  /* Стрелка */
  &::after {
    content: '';
    position: absolute;
    left: var(--arrow-offset, 50%);
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
  }

  ${props => props.$position === 'top' ? `
    margin-bottom: 10px;
    &::after {
      top: 100%;
      border-color: ${props.theme?.card || '#333'} transparent transparent transparent;
    }
  ` : `
    margin-top: 10px;
    &::after {
      bottom: 100%;
      border-color: transparent transparent ${props.theme?.card || '#333'} transparent;
    }
  `}
`;

const Tooltip = ({ children, content, position = 'bottom', theme, delay = 200 }) => {
  const [visible, setVisible] = useState(false);
  const [positionStyle, setPositionStyle] = useState({ left: 0, top: 0, arrowOffset: 0 });
  const [timeoutId, setTimeoutId] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (visible && containerRef.current && content) {
      const rect = containerRef.current.getBoundingClientRect();
      const tooltipWidth = 200;
  
      // Центр целевого элемента (в пикселях от левого края окна)
      const targetCenter = rect.left + rect.width / 2;
  
      // Ограничиваем центр тултипа, чтобы он не вылезал за экран
      const minCenter = tooltipWidth / 2 + 10;
      const maxCenter = window.innerWidth - tooltipWidth / 2 - 10;
      const clampedCenter = Math.max(minCenter, Math.min(maxCenter, targetCenter));
  
      // Позиция тултипа
      const top = position === 'top' ? rect.top - 10 : rect.bottom + 10;
  
      // Смещение стрелки: на сколько пикселей от левого края тултипа
      // должна быть стрелка, чтобы она указывала на targetCenter
      //const targetArrowOffset = targetCenter - (clampedCenter - tooltipWidth / 2);
      //const arrowOffsetMin = targetCenter - (clampedCenter - tooltipWidth / 2) + 10;
      //const arrowOffsetMax = targetCenter - (clampedCenter - tooltipWidth / 2) - 10;
      //const arrowOffset = Math.max(arrowOffsetMin, Math.min(arrowOffsetMax, targetArrowOffset));
      const arrowOffset = targetCenter - (clampedCenter - tooltipWidth / 2);

      const tooltipLeft = clampedCenter - tooltipWidth / 2;
  
      setPositionStyle({ 
        left: tooltipLeft, 
        top,
        arrowOffset // ← сохраняем в состоянии
      });
    }
  }, [visible, position, content]);

  useEffect(() => {
    const handleScroll = () => {
      if (visible && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const tooltipWidth = 200;

        let left = rect.left + rect.width / 2;
        let top;

        const adjustedLeft = Math.max(
          10,
          Math.min(
            window.innerWidth - tooltipWidth - 10,
            left - tooltipWidth / 2
          )
        );

        if (position === 'top') {
          top = rect.top - 10;
        } else {
          top = rect.bottom + 10;
        }

        setPositionStyle({
          left: adjustedLeft + tooltipWidth / 2,
          top
        });
      }
    };

    if (visible) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visible, position]);

  const showTooltip = () => {
    const id = setTimeout(() => {
      if (containerRef.current) {
        setVisible(true);
      }
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setVisible(false);
  };

  return (
    <>
      <TooltipContainer
        ref={containerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </TooltipContainer>
      {visible && content && createPortal(
        <TooltipText
          $isVisible={visible}
          $position={position}
          theme={theme}
          style={{
            left: `${positionStyle.left}px`,
            top: `${positionStyle.top}px`,
            '--arrow-offset': `${positionStyle.arrowOffset}px`
          }}
        >
          {content}
        </TooltipText>,
        document.body
      )}
    </>
  );
};

export default Tooltip;