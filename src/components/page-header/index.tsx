"use client";

// DTOs
import { type PageHeaderProps } from "./page-header-props";

const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  return (
    <div className="mb-6 flex items-center justify-between py-4">
      <div>
        <h1 className="text-primary font-montserrat text-3xl font-extrabold">
          {title}
        </h1>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>
      {children ? (
        <div className="flex items-center gap-2">{children}</div>
      ) : null}
    </div>
  );
};

export default PageHeader;
