import CardDataStats from '@/components/CardDataStats';
import ChartOne from '@/components/Charts/ChartOne';
import ChartThree from '@/components/Charts/ChartThree';
import ChartTwo from '@/components/Charts/ChartTwo';
import ChatCard from '@/components/Chat/ChatCard';
import MapOne from '@/components/Maps/MapOne';
import TableOne from '@/components/Tables/TableOne';
import React, { useEffect, useRef, useState } from 'react';

const ResponsiveContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    // Initial width setting
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    // Handler to update container width
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        if (entry.target === containerRef.current) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Define responsive styles or classes based on container width
  const containerClassName = containerWidth < 600
    ? 'bg-red-500' // Example: Tailwind class for light red background
    : 'bg-blue-500'; // Example: Tailwind class for light blue background

  return (
    <div ref={containerRef} className={`container ${containerClassName} transition-colors duration-300`}>
      <div className="grid grid-cols-1 flex-wrap gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total views" total="$3.456K" rate="0.43%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG Paths */}
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Profit" total="$45,2K" rate="4.35%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG Paths */}
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Product" total="2.450" rate="2.59%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG Paths */}
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Users" total="3.456" rate="0.95%" levelDown>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG Paths */}
          </svg>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </div>
  );
};

export default ResponsiveContainer;
