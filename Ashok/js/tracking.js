/**
 * ASHOK COURIER SERVICES - Parcel Tracking System
 * Handles tracking lookups, sample data, localStorage integration, and visual timelines
 */

// Default Comprehensive Sample Database
const DEFAULT_TRACKING_DATA = {
  "ACS-89421-IN": {
    trackingId: "ACS-89421-IN",
    serviceType: "Domestic Express Air",
    sender: {
      name: "TechWorld Electronics Hub",
      city: "New Delhi",
      address: "Okhla Industrial Area Phase III, New Delhi 110020"
    },
    receiver: {
      name: "Rohit Malhotra",
      city: "Mumbai",
      address: "Bandra Kurla Complex, Bandra East, Mumbai 400051"
    },
    origin: "New Delhi (DEL)",
    destination: "Mumbai (BOM)",
    parcelType: "Consumer Electronics (Laptops)",
    weight: "2.80 kg",
    pieces: "1 Box",
    bookingDate: "04 Nov 2026, 10:30 AM",
    expectedDelivery: "07 Nov 2026 by 05:00 PM",
    currentLocation: "Bhiwandi Hub, Mumbai",
    statusCode: "transit", // booked, picked, transit, out, delivered
    statusLabel: "In Transit",
    currentStep: 3, // 1 to 5
    milestones: [
      {
        status: "Departed Sorting Center",
        location: "Delhi IGI Air Logistics Hub",
        timestamp: "05 Nov 2026, 11:45 PM",
        remarks: "Flight ACS-Air 402 en-route to Mumbai Cargo Hub."
      },
      {
        status: "Sorting & Bagging Complete",
        location: "Delhi Central Hub, Mahipalpur",
        timestamp: "05 Nov 2026, 04:30 PM",
        remarks: "Scanned and verified through automated dimension weigh sorter."
      },
      {
        status: "Parcel Picked Up",
        location: "Okhla Center, New Delhi",
        timestamp: "04 Nov 2026, 03:15 PM",
        remarks: "Courier associate Rahul Verma collected parcel from consignor."
      },
      {
        status: "Shipment Created & Booked",
        location: "Ashok Courier Online Portal",
        timestamp: "04 Nov 2026, 10:30 AM",
        remarks: "Digital shipping label generated and payment verified."
      }
    ]
  },
  "ACS-65102-EXP": {
    trackingId: "ACS-65102-EXP",
    serviceType: "Same-Day Priority Express",
    sender: {
      name: "Apex Corporate Legal Services",
      city: "Bengaluru",
      address: "MG Road, Trinity Circle, Bengaluru 560001"
    },
    receiver: {
      name: "Kavita R. Rao",
      city: "Bengaluru",
      address: "Whitefield IT Park, EPIP Zone, Bengaluru 560066"
    },
    origin: "Bengaluru CBD (BLR)",
    destination: "Bengaluru East (BLR)",
    parcelType: "Confidential Legal Documents",
    weight: "0.45 kg",
    pieces: "1 Security Pouch",
    bookingDate: "06 Nov 2026, 08:30 AM",
    expectedDelivery: "Today, by 04:30 PM",
    currentLocation: "Whitefield Delivery Hub, Bengaluru",
    statusCode: "out",
    statusLabel: "Out for Delivery",
    currentStep: 4,
    milestones: [
      {
        status: "Out for Delivery",
        location: "Whitefield Hub, Bengaluru",
        timestamp: "06 Nov 2026, 01:15 PM",
        remarks: "With courier delivery agent Manoj Kumar (Contact: +91 98451 00291)."
      },
      {
        status: "Received at Delivery Hub",
        location: "Whitefield Hub, Bengaluru",
        timestamp: "06 Nov 2026, 11:20 AM",
        remarks: "Sorted for final destination route 14B."
      },
      {
        status: "Picked Up by Express Rider",
        location: "MG Road Branch, Bengaluru",
        timestamp: "06 Nov 2026, 09:10 AM",
        remarks: "Tamper-evident seal verified."
      },
      {
        status: "Shipment Booked",
        location: "Bengaluru Express Counter",
        timestamp: "06 Nov 2026, 08:30 AM",
        remarks: "Priority same-day dispatch registered."
      }
    ]
  },
  "ACS-44319-INT": {
    trackingId: "ACS-44319-INT",
    serviceType: "International Priority Cargo",
    sender: {
      name: "Global Biotech Labs Inc.",
      city: "New York, USA",
      address: "5th Avenue, Manhattan, NY 10018, USA"
    },
    receiver: {
      name: "Dr. Suresh K. Reddy",
      city: "Hyderabad",
      address: "Genome Valley, Shamirpet, Hyderabad 500078"
    },
    origin: "New York (JFK), United States",
    destination: "Hyderabad (HYD), India",
    parcelType: "Temperature Controlled Medical Samples",
    weight: "4.50 kg",
    pieces: "1 Insulated Shipper",
    bookingDate: "30 Oct 2026, 09:00 AM",
    expectedDelivery: "04 Nov 2026, Delivered",
    currentLocation: "Delivered to Consignee",
    statusCode: "delivered",
    statusLabel: "Delivered",
    currentStep: 5,
    milestones: [
      {
        status: "Delivered Successfully",
        location: "Hyderabad, Telangana",
        timestamp: "04 Nov 2026, 02:45 PM",
        remarks: "Signed for by Dr. Suresh K. Reddy. Digital signature captured on device."
      },
      {
        status: "Out for Delivery",
        location: "Secunderabad Express Station",
        timestamp: "04 Nov 2026, 09:30 AM",
        remarks: "Allocated to temperature-regulated transit van."
      },
      {
        status: "Customs Clearance Completed",
        location: "RGIA Airport Cargo Terminal, Hyderabad",
        timestamp: "03 Nov 2026, 06:15 PM",
        remarks: "Customs duty cleared. Handled with sterile compliance."
      },
      {
        status: "Arrival at Destination Country",
        location: "Indira Gandhi Int'l Airport Hub, Delhi",
        timestamp: "02 Nov 2026, 11:20 PM",
        remarks: "Transferred to domestic connector flight to Hyderabad."
      },
      {
        status: "International Departure",
        location: "JFK International Hub, New York",
        timestamp: "31 Oct 2026, 07:00 PM",
        remarks: "Cargo loaded onto flight BA-178."
      },
      {
        status: "Shipment Picked & Processed",
        location: "Manhattan Depot, New York",
        timestamp: "30 Oct 2026, 09:00 AM",
        remarks: "International air waybill generated."
      }
    ]
  },
  "ACS-10293-DEL": {
    trackingId: "ACS-10293-DEL",
    serviceType: "Standard Domestic Ground",
    sender: {
      name: "Kanchipuram Silk Traders",
      city: "Chennai",
      address: "T. Nagar Commercial Complex, Chennai 600017"
    },
    receiver: {
      name: "Debashis Mukherjee",
      city: "Kolkata",
      address: "Salt Lake Sector V, Kolkata 700091"
    },
    origin: "Chennai (MAA)",
    destination: "Kolkata (CCU)",
    parcelType: "Textiles & Handloom Apparel",
    weight: "8.20 kg",
    pieces: "2 Cartons",
    bookingDate: "06 Nov 2026, 11:15 AM",
    expectedDelivery: "10 Nov 2026 by 06:00 PM",
    currentLocation: "T. Nagar Ashok Branch, Chennai",
    statusCode: "booked",
    statusLabel: "Order Booked",
    currentStep: 1,
    milestones: [
      {
        status: "Booking Confirmed & Waybill Generated",
        location: "T. Nagar Branch, Chennai",
        timestamp: "06 Nov 2026, 11:15 AM",
        remarks: "Shipment booked online. Pickup rider assigned."
      }
    ]
  },
  "ACS-55820-PKD": {
    trackingId: "ACS-55820-PKD",
    serviceType: "Domestic Express Air",
    sender: {
      name: "Precision Auto Components Ltd",
      city: "Pune",
      address: "Pimpri Chinchwad MIDC, Pune 411018"
    },
    receiver: {
      name: "Gujarat Industrial Motors",
      city: "Ahmedabad",
      address: "Sanand GIDC Industrial Estate, Ahmedabad 382110"
    },
    origin: "Pune (PNQ)",
    destination: "Ahmedabad (AMD)",
    parcelType: "Machinery Spares & Tools",
    weight: "5.60 kg",
    pieces: "1 Crate",
    bookingDate: "05 Nov 2026, 04:00 PM",
    expectedDelivery: "08 Nov 2026 by 02:00 PM",
    currentLocation: "Pune Sorting Hub, Chakan",
    statusCode: "picked",
    statusLabel: "Parcel Picked Up",
    currentStep: 2,
    milestones: [
      {
        status: "Inbound Scan at Origin Hub",
        location: "Pune Sorting Hub, Chakan",
        timestamp: "06 Nov 2026, 09:30 AM",
        remarks: "Parcel barcoded and placed on outbound line to Ahmedabad."
      },
      {
        status: "Picked Up from Shipper",
        location: "Pimpri MIDC, Pune",
        timestamp: "05 Nov 2026, 05:45 PM",
        remarks: "Package received in sound condition."
      },
      {
        status: "Order Booked",
        location: "Pune Commercial Branch",
        timestamp: "05 Nov 2026, 04:00 PM",
        remarks: "Digital booking created."
      }
    ]
  }
};

// Initialize Tracking Database (Merge default sample with localStorage)
function getTrackingDatabase() {
  let db = { ...DEFAULT_TRACKING_DATA };
  
  // Merge locally booked shipments
  const storedBookings = localStorage.getItem('acs_bookings');
  if (storedBookings) {
    try {
      const bookingsArray = JSON.parse(storedBookings);
      bookingsArray.forEach(item => {
        if (item && item.trackingId) {
          db[item.trackingId] = item;
        }
      });
    } catch (e) {
      console.error("Error reading stored bookings:", e);
    }
  }

  // Also merge custom modified tracking records if any
  const customDB = localStorage.getItem('acs_tracking_db');
  if (customDB) {
    try {
      const parsedCustom = JSON.parse(customDB);
      db = { ...db, ...parsedCustom };
    } catch (e) {
      console.error(e);
    }
  }

  return db;
}

// Main page initializer for tracking.html
document.addEventListener('DOMContentLoaded', function () {
  initTrackingPage();
});

function initTrackingPage() {
  const trackingForm = document.getElementById('trackingSearchForm');
  const trackIdInput = document.getElementById('trackIdInput');

  // Check for tracking query parameter in URL (e.g. ?id=ACS-89421-IN)
  const urlParams = new URLSearchParams(window.location.search);
  const queryId = urlParams.get('id');

  if (queryId && trackIdInput) {
    trackIdInput.value = queryId.trim();
    performTrackingSearch(queryId.trim());
  }

  if (trackingForm) {
    trackingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const id = trackIdInput.value.trim().toUpperCase();
      if (!id) {
        if (typeof showToast === 'function') {
          showToast('Please enter a Tracking ID to search', 'error');
        } else {
          alert('Please enter a Tracking ID');
        }
        return;
      }
      performTrackingSearch(id);
    });
  }
}

// Perform Tracking Search Logic
function performTrackingSearch(trackingId) {
  const normalizedId = trackingId.toUpperCase().trim();
  const db = getTrackingDatabase();
  const parcel = db[normalizedId];

  const resultsContainer = document.getElementById('trackingResultArea');
  const errorContainer = document.getElementById('trackingErrorArea');
  const emptyState = document.getElementById('trackingEmptyState');

  if (emptyState) emptyState.style.display = 'none';

  if (!parcel) {
    // Show not found error card
    if (resultsContainer) resultsContainer.style.display = 'none';
    if (errorContainer) {
      errorContainer.style.display = 'block';
      errorContainer.innerHTML = `
        <div class="card border-0 shadow-sm p-4 text-center" style="border-radius: 16px; background: #FFF5F5; border: 1.5px solid #FED7D7;">
          <div style="font-size: 3rem; color: #E53E3E; margin-bottom: 12px;">
            <i class="fas fa-search-minus"></i>
          </div>
          <h4 class="text-danger fw-bold">Tracking ID Not Found</h4>
          <p class="text-muted" style="max-width: 520px; margin: 0 auto 18px auto;">
            We couldn't locate any shipment matching <strong>"${escapeHTML(normalizedId)}"</strong>. Please double-check the tracking number on your consignment note or receipt.
          </p>
          <div>
            <span class="text-muted small d-block mb-2">Try testing with one of our active sample parcels:</span>
            <div class="d-flex justify-content-center flex-wrap gap-2">
              <button class="btn btn-sm btn-outline-navy sample-chip-btn" onclick="performTrackingSearch('ACS-89421-IN')">ACS-89421-IN (In Transit)</button>
              <button class="btn btn-sm btn-outline-navy sample-chip-btn" onclick="performTrackingSearch('ACS-65102-EXP')">ACS-65102-EXP (Out for Delivery)</button>
              <button class="btn btn-sm btn-outline-navy sample-chip-btn" onclick="performTrackingSearch('ACS-44319-INT')">ACS-44319-INT (Delivered)</button>
              <button class="btn btn-sm btn-outline-navy sample-chip-btn" onclick="performTrackingSearch('ACS-10293-DEL')">ACS-10293-DEL (Order Booked)</button>
            </div>
          </div>
        </div>
      `;
    }
    if (typeof showToast === 'function') {
      showToast(`No parcel found for ID: ${normalizedId}`, 'error');
    }
    return;
  }

  // Parcel Found! Hide error and render details
  if (errorContainer) errorContainer.style.display = 'none';
  if (resultsContainer) {
    resultsContainer.style.display = 'block';
    renderShipmentCard(parcel, resultsContainer);
    // Smooth scroll down to result
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (typeof showToast === 'function') {
    showToast(`Tracking record loaded for ${parcel.trackingId}`, 'success');
  }
}

// Render the Comprehensive Tracking Details Card
function renderShipmentCard(data, container) {
  const step = data.currentStep || 1;
  const statusClass = `status-${data.statusCode || 'booked'}`;

  // Calculate Stepper Progress Percentage
  let progressWidth = '0%';
  if (step === 1) progressWidth = '5%';
  else if (step === 2) progressWidth = '28%';
  else if (step === 3) progressWidth = '52%';
  else if (step === 4) progressWidth = '76%';
  else if (step === 5) progressWidth = '100%';

  // 5 standard steps
  const stepsConfig = [
    { num: 1, name: "Order Booked", icon: "fa-file-invoice", desc: "Digital label created" },
    { num: 2, name: "Parcel Picked Up", icon: "fa-dolly-flatbed", desc: "Collected by rider" },
    { num: 3, name: "In Transit", icon: "fa-shipping-fast", desc: "Moving between hubs" },
    { num: 4, name: "Out for Delivery", icon: "fa-motorcycle", desc: "Assigned to final delivery" },
    { num: 5, name: "Delivered", icon: "fa-box-open", desc: "Safely handed over" }
  ];

  let stepperHtml = '';
  stepsConfig.forEach((s) => {
    let stateClass = '';
    if (step > s.num) stateClass = 'completed';
    else if (step === s.num) stateClass = 'active';

    stepperHtml += `
      <div class="stepper-item ${stateClass}">
        <div class="stepper-icon">
          <i class="fas ${s.icon}"></i>
        </div>
        <div class="stepper-title">${s.name}</div>
        <div class="stepper-time">${s.desc}</div>
      </div>
    `;
  });

  // Milestones Feed HTML
  let milestonesHtml = '';
  if (data.milestones && data.milestones.length > 0) {
    data.milestones.forEach(m => {
      milestonesHtml += `
        <tr>
          <td><strong class="text-navy">${escapeHTML(m.status)}</strong></td>
          <td><i class="fas fa-map-marker-alt text-danger me-1"></i> ${escapeHTML(m.location)}</td>
          <td class="text-muted"><i class="far fa-clock me-1"></i> ${escapeHTML(m.timestamp)}</td>
          <td><span class="text-body">${escapeHTML(m.remarks || 'Standard transit milestone.')}</span></td>
        </tr>
      `;
    });
  } else {
    milestonesHtml = `<tr><td colspan="4" class="text-center text-muted py-3">No activity logs recorded yet.</td></tr>`;
  }

  container.innerHTML = `
    <div class="track-result-card" id="printableShipmentCard">
      <!-- Card Top Bar -->
      <div class="track-header-bar">
        <div>
          <span class="small text-white-50 text-uppercase d-block mb-1">Waybill Consignment ID</span>
          <span class="track-id-badge"><i class="fas fa-barcode me-2"></i>${data.trackingId}</span>
        </div>
        <div class="d-flex align-items-center gap-3">
          <div class="text-end d-none d-md-block">
            <span class="small text-white-50 d-block">Current Status</span>
            <span class="status-pill ${statusClass}">
              <i class="fas fa-circle fa-xs me-1"></i> ${data.statusLabel}
            </span>
          </div>
          <button class="btn btn-sm btn-light btn-print text-navy fw-semibold" onclick="window.print()">
            <i class="fas fa-print me-1"></i> Print Slip
          </button>
        </div>
      </div>

      <!-- Quick Info Grid -->
      <div class="shipment-info-grid">
        <div class="info-block">
          <span class="info-label"><i class="fas fa-plane-departure me-1"></i> Origin</span>
          <span class="info-value">${escapeHTML(data.origin || data.sender.city)}</span>
          <span class="info-sub">${escapeHTML(data.sender.name)}</span>
        </div>
        <div class="info-block">
          <span class="info-label"><i class="fas fa-plane-arrival me-1"></i> Destination</span>
          <span class="info-value">${escapeHTML(data.destination || data.receiver.city)}</span>
          <span class="info-sub">${escapeHTML(data.receiver.name)}</span>
        </div>
        <div class="info-block">
          <span class="info-label"><i class="fas fa-calendar-check me-1"></i> Estimated Delivery</span>
          <span class="info-value text-orange">${escapeHTML(data.expectedDelivery)}</span>
          <span class="info-sub">Booked: ${escapeHTML(data.bookingDate)}</span>
        </div>
        <div class="info-block">
          <span class="info-label"><i class="fas fa-box me-1"></i> Parcel Details</span>
          <span class="info-value">${escapeHTML(data.weight)}</span>
          <span class="info-sub">${escapeHTML(data.parcelType)}</span>
        </div>
        <div class="info-block">
          <span class="info-label"><i class="fas fa-map-pin me-1"></i> Current Location</span>
          <span class="info-value text-primary">${escapeHTML(data.currentLocation)}</span>
          <span class="info-sub">${escapeHTML(data.serviceType || 'Standard Express')}</span>
        </div>
      </div>

      <!-- Visual 5-Step Progress Timeline -->
      <div class="timeline-container">
        <h5 class="fw-bold mb-4 text-navy"><i class="fas fa-route me-2 text-orange"></i>Live Transit Progress</h5>
        <div class="stepper-wrapper">
          <div class="stepper-progress-bar" style="width: ${progressWidth};"></div>
          ${stepperHtml}
        </div>
      </div>

      <!-- Detailed Address & Milestone Information -->
      <div class="row g-4 px-4 pb-4">
        <div class="col-md-6">
          <div class="p-3 rounded-3" style="background: #F8FAFC; border: 1px solid #E2E8F0;">
            <div class="d-flex align-items-center gap-2 mb-2">
              <i class="fas fa-arrow-circle-up text-primary"></i>
              <strong class="text-navy">Sender (Consignor)</strong>
            </div>
            <div class="fw-semibold text-dark">${escapeHTML(data.sender.name)}</div>
            <div class="text-muted small">${escapeHTML(data.sender.address)}</div>
            <div class="text-muted small mt-1">City: <strong>${escapeHTML(data.sender.city)}</strong></div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="p-3 rounded-3" style="background: #F8FAFC; border: 1px solid #E2E8F0;">
            <div class="d-flex align-items-center gap-2 mb-2">
              <i class="fas fa-arrow-circle-down text-success"></i>
              <strong class="text-navy">Receiver (Consignee)</strong>
            </div>
            <div class="fw-semibold text-dark">${escapeHTML(data.receiver.name)}</div>
            <div class="text-muted small">${escapeHTML(data.receiver.address)}</div>
            <div class="text-muted small mt-1">City: <strong>${escapeHTML(data.receiver.city)}</strong></div>
          </div>
        </div>
      </div>

      <!-- Milestone Activity Log Table -->
      <div class="milestones-feed">
        <h5 class="fw-bold mb-3 text-navy"><i class="fas fa-history me-2 text-orange"></i>Shipment Activity History</h5>
        <div class="table-responsive">
          <table class="milestones-table">
            <thead>
              <tr>
                <th>Event / Activity</th>
                <th>Hub / Location</th>
                <th>Date & Time</th>
                <th>Remarks / Details</th>
              </tr>
            </thead>
            <tbody>
              ${milestonesHtml}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Bottom Actions -->
      <div class="p-3 bg-light border-top d-flex justify-content-between align-items-center flex-wrap gap-2 no-print">
        <span class="text-muted small">
          <i class="fas fa-shield-alt text-success me-1"></i> Ashok Courier 100% On-Time Assurance Guarantee
        </span>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-navy" onclick="copyTrackingShareLink('${data.trackingId}')">
            <i class="fas fa-share-alt me-1"></i> Share Link
          </button>
          <a href="contact.html" class="btn btn-sm btn-orange">
            <i class="fas fa-headset me-1"></i> Need Help?
          </a>
        </div>
      </div>
    </div>
  `;
}

function copyTrackingShareLink(trackingId) {
  const shareUrl = `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(trackingId)}`;
  navigator.clipboard.writeText(shareUrl).then(() => {
    if (typeof showToast === 'function') {
      showToast('Tracking link copied to clipboard!', 'success');
    } else {
      alert('Tracking link copied!');
    }
  }).catch(() => {
    prompt('Copy this tracking link:', shareUrl);
  });
}

