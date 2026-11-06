/**
 * ASHOK COURIER SERVICES - Courier Booking System
 * Live Fare Estimator, Form Validation, Unique ID Generator, and LocalStorage persistence
 */

document.addEventListener('DOMContentLoaded', function () {
  initBookingSystem();
  renderRecentBookings();
});

function initBookingSystem() {
  const bookingForm = document.getElementById('courierBookingForm');
  const weightInput = document.getElementById('parcelWeight');
  const deliveryTypeSelect = document.getElementById('deliveryType');
  const insuranceCheck = document.getElementById('insuranceOption');
  const fragileCheck = document.getElementById('fragileHandling');
  const pickupDateInput = document.getElementById('pickupDate');

  // Set default date to today or tomorrow
  if (pickupDateInput) {
    const today = new Date().toISOString().split('T')[0];
    pickupDateInput.min = today;
    pickupDateInput.value = today;
  }

  // Bind live price calculation events
  const calcInputs = [weightInput, deliveryTypeSelect, insuranceCheck, fragileCheck];
  calcInputs.forEach(el => {
    if (el) {
      el.addEventListener('input', calculateLiveFare);
      el.addEventListener('change', calculateLiveFare);
    }
  });

  // Initial calculation
  calculateLiveFare();

  // Form submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleBookingSubmit);
  }
}

// Live Fare Calculator
function calculateLiveFare() {
  const weightInput = document.getElementById('parcelWeight');
  const deliveryTypeSelect = document.getElementById('deliveryType');
  const insuranceCheck = document.getElementById('insuranceOption');
  const fragileCheck = document.getElementById('fragileHandling');

  const weight = parseFloat(weightInput ? weightInput.value : 1) || 1;
  const deliveryType = deliveryTypeSelect ? deliveryTypeSelect.value : 'standard';

  let baseRate = 90;
  let perKgRate = 45;
  let serviceName = "Domestic Standard";

  if (deliveryType === 'express') {
    baseRate = 180;
    perKgRate = 85;
    serviceName = "Express Overnight Air";
  } else if (deliveryType === 'sameday') {
    baseRate = 290;
    perKgRate = 120;
    serviceName = "Same-Day Priority";
  } else if (deliveryType === 'international') {
    baseRate = 850;
    perKgRate = 350;
    serviceName = "International Cargo";
  }

  // Weight fee: base covers first 0.5kg
  const extraWeight = Math.max(0, weight - 0.5);
  const weightFee = Math.round(extraWeight * perKgRate);

  // Add-ons
  const fragileFee = (fragileCheck && fragileCheck.checked) ? 50 : 0;
  const insuranceFee = (insuranceCheck && insuranceCheck.checked) ? 60 : 0;

  const subtotal = baseRate + weightFee + fragileFee + insuranceFee;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  // Update UI Elements
  updateText('fareBaseAmount', `₹${baseRate}`);
  updateText('fareWeightAmount', `₹${weightFee}`);
  updateText('fareAddonsAmount', `₹${fragileFee + insuranceFee}`);
  updateText('fareTaxAmount', `₹${gst}`);
  updateText('fareTotalAmount', `₹${total}`);
  updateText('fareServiceName', serviceName);

  return { baseRate, weightFee, fragileFee, insuranceFee, subtotal, gst, total, serviceName };
}

function updateText(elementId, text) {
  const el = document.getElementById(elementId);
  if (el) el.innerText = text;
}

// Form Submission & Generation
function handleBookingSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.getElementById('bookSubmitBtn');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Confirm Booking';

  // Basic Validation
  const senderName = document.getElementById('senderName').value.trim();
  const senderPhone = document.getElementById('senderPhone').value.trim();
  const senderAddress = document.getElementById('senderAddress').value.trim();
  const senderCity = document.getElementById('senderCity').value.trim();
  const senderPincode = document.getElementById('senderPincode').value.trim();

  const receiverName = document.getElementById('receiverName').value.trim();
  const receiverPhone = document.getElementById('receiverPhone').value.trim();
  const receiverAddress = document.getElementById('receiverAddress').value.trim();
  const receiverCity = document.getElementById('receiverCity').value.trim();
  const receiverPincode = document.getElementById('receiverPincode').value.trim();

  const parcelType = document.getElementById('parcelType').value;
  const parcelWeight = parseFloat(document.getElementById('parcelWeight').value) || 1;
  const deliveryType = document.getElementById('deliveryType').value;
  const pickupDate = document.getElementById('pickupDate').value;
  const pickupSlot = document.getElementById('pickupSlot').value;

  if (!senderName || !senderPhone || !senderAddress || !senderCity || !senderPincode) {
    showToast('Please fill in all complete Sender details', 'error');
    return;
  }

  if (!receiverName || !receiverPhone || !receiverAddress || !receiverCity || !receiverPincode) {
    showToast('Please fill in all complete Receiver details', 'error');
    return;
  }

  // Simulate loading spinner
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i> Generating Consignment...`;
  }

  setTimeout(() => {
    // Generate Unique Tracking ID: ACS + 5 digits + suffix
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    let suffix = 'IN';
    if (deliveryType === 'express') suffix = 'EXP';
    else if (deliveryType === 'sameday') suffix = 'PRI';
    else if (deliveryType === 'international') suffix = 'INT';

    const trackingId = `ACS-${randomDigits}-${suffix}`;

    // Calculate dates
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + 
                          ', ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    let daysToAdd = 3;
    if (deliveryType === 'sameday') daysToAdd = 0;
    else if (deliveryType === 'express') daysToAdd = 1;
    else if (deliveryType === 'international') daysToAdd = 5;

    const estDeliveryDate = new Date();
    estDeliveryDate.setDate(estDeliveryDate.getDate() + daysToAdd);
    const estDeliveryStr = estDeliveryDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + 
                          (daysToAdd === 0 ? ' (Today by 8:00 PM)' : ' by 6:00 PM');

    const fare = calculateLiveFare();

    // Create New Shipment Object
    const newShipment = {
      trackingId: trackingId,
      serviceType: fare.serviceName,
      sender: {
        name: senderName,
        phone: senderPhone,
        city: senderCity,
        address: `${senderAddress}, Pincode: ${senderPincode}`
      },
      receiver: {
        name: receiverName,
        phone: receiverPhone,
        city: receiverCity,
        address: `${receiverAddress}, Pincode: ${receiverPincode}`
      },
      origin: `${senderCity} (${senderPincode})`,
      destination: `${receiverCity} (${receiverPincode})`,
      parcelType: parcelType,
      weight: `${parcelWeight} kg`,
      pieces: "1 Package",
      bookingDate: formattedDate,
      pickupScheduled: `${pickupDate} (${pickupSlot})`,
      expectedDelivery: estDeliveryStr,
      currentLocation: `${senderCity} Origin Hub (Pickup Scheduled)`,
      statusCode: "booked",
      statusLabel: "Order Booked",
      currentStep: 1,
      fare: fare.total,
      milestones: [
        {
          status: "Order Booked & Confirmed",
          location: `${senderCity} Branch`,
          timestamp: formattedDate,
          remarks: `Pickup scheduled for ${pickupDate} during ${pickupSlot}. Executive will contact ${senderPhone}.`
        }
      ]
    };

    // Save to localStorage['acs_bookings']
    saveBookingToStorage(newShipment);

    // Reset button state
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }

    // Reset form
    form.reset();
    calculateLiveFare();

    // Show Confirmation Modal
    showBookingConfirmationModal(newShipment);

    // Re-render recent bookings list
    renderRecentBookings();

  }, 1200);
}

function saveBookingToStorage(booking) {
  let list = [];
  const existing = localStorage.getItem('acs_bookings');
  if (existing) {
    try {
      list = JSON.parse(existing);
    } catch (e) {
      list = [];
    }
  }
  // Prepend to top
  list.unshift(booking);
  localStorage.setItem('acs_bookings', JSON.stringify(list));
}

// Show Confirmation Modal
function showBookingConfirmationModal(shipment) {
  let modalEl = document.getElementById('bookingSuccessModal');
  if (!modalEl) {
    const modalHTML = `
      <div class="modal fade" id="bookingSuccessModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content border-0 shadow-lg" style="border-radius: 20px; overflow: hidden;">
            <div class="modal-header text-white" style="background: linear-gradient(135deg, #0B2545 0%, #133E87 100%);">
              <h5 class="modal-title fw-bold">
                <i class="fas fa-check-circle text-success me-2"></i> Courier Booked Successfully!
              </h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4" id="modalBookingBody">
            </div>
            <div class="modal-footer bg-light">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
              <a href="#" id="modalTrackBtn" class="btn btn-orange">
                <i class="fas fa-search-location me-2"></i> Track Shipment Now
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    modalEl = document.getElementById('bookingSuccessModal');
  }

  const bodyEl = document.getElementById('modalBookingBody');
  const trackBtn = document.getElementById('modalTrackBtn');

  if (bodyEl) {
    bodyEl.innerHTML = `
      <div class="text-center mb-4">
        <div style="width: 70px; height: 70px; background: #DCFCE7; color: #16A34A; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 15px auto;">
          <i class="fas fa-box-check"></i>
        </div>
        <h4 class="fw-bold text-navy">Consignment Successfully Created!</h4>
        <p class="text-muted mb-3">Your pickup request has been dispatched to the nearest Ashok Courier hub.</p>
        
        <div class="p-3 rounded-3 d-inline-flex align-items-center gap-3" style="background: #F1F5F9; border: 2px dashed #0B2545;">
          <div>
            <span class="text-muted small text-uppercase d-block fw-semibold">Your Tracking Waybill ID</span>
            <span class="fs-4 fw-bold text-navy" id="modalTrackingIdText">${shipment.trackingId}</span>
          </div>
          <button class="btn btn-sm btn-outline-navy" onclick="copyModalTrackingId('${shipment.trackingId}')" title="Copy to clipboard">
            <i class="fas fa-copy"></i> Copy
          </button>
        </div>
      </div>

      <div class="row g-3">
        <div class="col-sm-6">
          <div class="p-3 rounded bg-light border">
            <div class="text-muted small fw-bold text-uppercase">Sender</div>
            <div class="fw-bold text-navy">${escapeHTML(shipment.sender.name)}</div>
            <div class="small text-muted">${escapeHTML(shipment.sender.city)} (${shipment.sender.phone})</div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="p-3 rounded bg-light border">
            <div class="text-muted small fw-bold text-uppercase">Receiver</div>
            <div class="fw-bold text-navy">${escapeHTML(shipment.receiver.name)}</div>
            <div class="small text-muted">${escapeHTML(shipment.receiver.city)} (${shipment.receiver.phone})</div>
          </div>
        </div>
      </div>

      <div class="mt-3 p-3 rounded-3" style="background: #FFF0E6; border: 1px solid rgba(255,107,0,0.3);">
        <div class="row text-center text-sm-start">
          <div class="col-sm-4 mb-2 mb-sm-0">
            <span class="text-muted small d-block">Estimated Delivery</span>
            <strong class="text-orange">${shipment.expectedDelivery}</strong>
          </div>
          <div class="col-sm-4 mb-2 mb-sm-0">
            <span class="text-muted small d-block">Service Tier</span>
            <strong class="text-navy">${shipment.serviceType}</strong>
          </div>
          <div class="col-sm-4">
            <span class="text-muted small d-block">Total Paid</span>
            <strong class="text-success fs-5">₹${shipment.fare}</strong>
          </div>
        </div>
      </div>
    `;
  }

  if (trackBtn) {
    trackBtn.href = `tracking.html?id=${encodeURIComponent(shipment.trackingId)}`;
  }

  if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  }
}

function copyModalTrackingId(id) {
  navigator.clipboard.writeText(id).then(() => {
    if (typeof showToast === 'function') {
      showToast(`Copied ${id} to clipboard!`, 'success');
    } else {
      alert('Tracking ID copied!');
    }
  });
}

// Render User's Recent Bookings
function renderRecentBookings() {
  const container = document.getElementById('recentBookingsContainer');
  if (!container) return;

  const stored = localStorage.getItem('acs_bookings');
  let list = [];
  if (stored) {
    try {
      list = JSON.parse(stored);
    } catch (e) {
      list = [];
    }
  }

  if (!list.length) {
    container.innerHTML = `
      <div class="text-center py-5 text-muted">
        <i class="fas fa-boxes fa-3x mb-3 text-secondary" style="opacity: 0.4;"></i>
        <h6>No Previous Bookings Stored in this Browser</h6>
        <p class="small">Book a parcel using the form above to see your order history and live tracking links here.</p>
      </div>
    `;
    return;
  }

  let tableRows = '';
  list.forEach((item, index) => {
    tableRows += `
      <tr>
        <td>
          <a href="tracking.html?id=${encodeURIComponent(item.trackingId)}" class="fw-bold text-navy text-decoration-none">
            <i class="fas fa-barcode text-orange me-1"></i> ${item.trackingId}
          </a>
        </td>
        <td>
          <div class="fw-semibold">${escapeHTML(item.sender.city)} &rarr; ${escapeHTML(item.receiver.city)}</div>
          <small class="text-muted">${escapeHTML(item.receiver.name)}</small>
        </td>
        <td><span class="badge bg-light text-navy border">${item.serviceType}</span></td>
        <td>${item.weight}</td>
        <td><span class="badge bg-warning text-dark">${item.statusLabel}</span></td>
        <td><strong>₹${item.fare || '180'}</strong></td>
        <td>
          <div class="btn-group btn-group-sm">
            <a href="tracking.html?id=${encodeURIComponent(item.trackingId)}" class="btn btn-outline-navy" title="Track">
              <i class="fas fa-eye"></i>
            </a>
            <button class="btn btn-outline-danger" onclick="deleteBookingRecord(${index})" title="Delete record">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  container.innerHTML = `
    <div class="table-responsive">
      <table class="table table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th>Tracking ID</th>
            <th>Route & Consignee</th>
            <th>Service</th>
            <th>Weight</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  `;
}

function deleteBookingRecord(index) {
  if (!confirm('Are you sure you want to remove this booking from your local history?')) return;
  const stored = localStorage.getItem('acs_bookings');
  if (stored) {
    try {
      let list = JSON.parse(stored);
      list.splice(index, 1);
      localStorage.setItem('acs_bookings', JSON.stringify(list));
      renderRecentBookings();
      if (typeof showToast === 'function') {
        showToast('Booking record removed.', 'info');
      }
    } catch (e) {
      console.error(e);
    }
  }
}

