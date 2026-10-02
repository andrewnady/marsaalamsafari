'use client';

import { useEffect } from 'react';
import { installWhatsAppClickTracking } from '@/lib/whatsapp-click-tracking';

/** Counts clicks on every WhatsApp button (see src/lib/whatsapp-click-tracking.ts). Renders nothing. */
export function WhatsAppClickTracker() {
  useEffect(() => {
    installWhatsAppClickTracking();
  }, []);
  return null;
}
