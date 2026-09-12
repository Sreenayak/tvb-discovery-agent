/**
 * Safe URL opener utility that prevents blank pages in sandboxed iframe previews.
 */
export function sanitizeUrl(url?: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function safeOpenExternalUrl(
  url?: string,
  onNotify?: (message: string, type?: 'info' | 'success' | 'error') => void
): boolean {
  if (!url) {
    if (onNotify) onNotify('No destination URL provided.', 'error');
    return false;
  }

  const cleanUrl = sanitizeUrl(url);

  try {
    // Attempt window.open with noopener and noreferrer
    const newWindow = window.open(cleanUrl, '_blank', 'noopener,noreferrer');
    
    // In sandboxed iframes (e.g. Google AI Studio / Cloud Run preview),
    // popup blockers or missing allow-popups-to-escape-sandbox might block the new tab
    // or navigate to about:blank.
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      navigator.clipboard.writeText(cleanUrl);
      if (onNotify) {
        onNotify(`External link copied to clipboard: ${cleanUrl}`, 'info');
      }
      return false;
    } else {
      if (onNotify) {
        onNotify(`Opened ${cleanUrl} in new tab.`, 'success');
      }
      return true;
    }
  } catch (err) {
    navigator.clipboard.writeText(cleanUrl);
    if (onNotify) {
      onNotify(`Link copied to clipboard: ${cleanUrl}`, 'info');
    }
    return false;
  }
}
