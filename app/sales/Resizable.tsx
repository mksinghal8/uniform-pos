'use client';
import ECommerce from '@/components/Dashboard/E-commerce';
import Products from '@/components/Products/Products';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

export function ResizableDemo() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-sm border border-stroke bg-white px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <ResizablePanel defaultSize={80} className="h-full p-4 overflow-auto ">
        <div className="overflow-hidden grid grid-cols-1">
          <Products />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={20}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
