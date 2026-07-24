"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation, site } from "../data";

function BrandMark() {
  const dotIndex = site.brandName.indexOf(".");

  return (
    <>
      <span className="brand-icon-crop" aria-hidden="true">
        <img src="/max-lee-mark.png" alt="" />
      </span>
      <span className="brand-wordmark">
        {dotIndex === -1 ? site.brandName : (
          <>
            {site.brandName.slice(0, dotIndex)}
            <span>.</span>
            {site.brandName.slice(dotIndex + 1)}
          </>
        )}
      </span>
    </>
  );
}

export function PrimaryNavigation() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link className="brand" href="/">
          <BrandMark />
        </Link>
        <div className="nav-tabs">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                className={isActive ? "is-active" : undefined}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
