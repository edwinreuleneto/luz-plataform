"use client";

// DTOs
import { type PageHeaderProps } from "./page-header-props";

const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>
      {children ? <div className="flex items-center gap-2">{children}</div> : null}
    </div>
  );
};

export default PageHeader;

