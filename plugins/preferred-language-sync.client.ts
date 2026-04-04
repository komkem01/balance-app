import { useAuthApi } from "../composables/useAuthApi";

declare const defineNuxtPlugin: (plugin: (nuxtApp: any) => void | Promise<void>) => any;

const LOCALE_KEY = "balance_app_locale";
const LOCALE_EVENT = "app-locale-changed";

type AppLocale = "en" | "th";

const thDictionary: Record<string, string> = {
  "- 145.00": "- 145.00",
  "2.4.0-PRO": "2.4.0-PRO",
  "Account Profile": "โปรไฟล์บัญชี",
  "Active Wallets": "กระเป๋าเงินที่ใช้งาน",
  "Allocated Amount": "จำนวนที่จัดสรร",
  "All Time": "ทั้งหมด",
  Amount: "จำนวนเงิน",
  Archive: "คลังข้อมูล",
  "Archive Asset": "บันทึกสินทรัพย์",
  "Archive Budget": "บันทึกงบประมาณ",
  "Archive Source (Wallet)": "แหล่งที่มา (กระเป๋าเงิน)",
  "Archiving...": "กำลังบันทึก...",
  "Are you sure you want to continue?": "คุณแน่ใจหรือไม่ว่าต้องการดำเนินการต่อ?",
  "Are you sure you want to log out from this session?": "คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบจากเซสชันนี้?",
  "Asset Name": "ชื่อสินทรัพย์",
  Aug: "ส.ค.",
  "Authenticated as": "เข้าสู่ระบบเป็น",
  BALANCE: "สมดุล",
  Balance: "Balance",
  "Back to login": "กลับไปหน้าเข้าสู่ระบบ",
  Bills: "บิล",
  "Bonus Pay": "โบนัส",
  "Brief description...": "คำอธิบายสั้นๆ...",
  "Budget Alert": "แจ้งเตือนงบประมาณ",
  "Budget Alerts": "แจ้งเตือนงบประมาณ",
  "Budget Allocation": "จัดสรรงบประมาณ",
  "Budget Archived": "บันทึกงบประมาณแล้ว",
  "Budget Terminated": "ยกเลิกงบประมาณแล้ว",
  Budgets: "งบประมาณ",
  Cancel: "ยกเลิก",
  "Cash on Hand": "เงินสดในมือ",
  Cash: "เงินสด",
  Categories: "หมวดหมู่",
  "Category Archived": "บันทึกหมวดหมู่แล้ว",
  "Category Removed": "ลบหมวดหมู่แล้ว",
  "Category name": "ชื่อหมวดหมู่",
  Category: "หมวดหมู่",
  "Category Color": "สีหมวดหมู่",
  "Change Password": "เปลี่ยนรหัสผ่าน",
  "Change account password?": "เปลี่ยนรหัสผ่านบัญชีหรือไม่?",
  "Changing Password...": "กำลังเปลี่ยนรหัสผ่าน...",
  "Choose file": "เลือกไฟล์",
  "Cinema Tickets": "ตั๋วภาพยนตร์",
  Close: "ปิด",
  "Confirm Action": "ยืนยันการทำรายการ",
  "Confirm Create Budget": "ยืนยันการสร้างงบประมาณ",
  "Confirm Create Wallet": "ยืนยันการสร้างกระเป๋าเงิน",
  "Confirm Delete Budget": "ยืนยันการลบงบประมาณ",
  "Confirm Delete Category": "ยืนยันการลบหมวดหมู่",
  "Confirm Delete Wallet": "ยืนยันการลบกระเป๋าเงิน",
  "Confirm Delete": "ยืนยันการลบ",
  "Confirm Logout": "ยืนยันการออกจากระบบ",
  "Confirm Remove Image": "ยืนยันการลบรูป",
  "Confirm Replace Image": "ยืนยันการแทนที่รูป",
  "Confirm Save": "ยืนยันการบันทึก",
  "Confirm Update Category": "ยืนยันการอัปเดตหมวดหมู่",
  "Confirm Update Wallet": "ยืนยันการอัปเดตกระเป๋าเงิน",
  Confirm: "ยืนยัน",
  "Confirm New Password": "ยืนยันรหัสผ่านใหม่",
  "Confirm Transaction": "ยืนยันธุรกรรม",
  "Contact Number": "เบอร์โทรศัพท์",
  "Continue with Google": "ดำเนินการต่อด้วย Google",
  "Create this budget with current information?": "สร้างงบประมาณนี้ด้วยข้อมูลปัจจุบันหรือไม่?",
  "Create this wallet with current information?": "สร้างกระเป๋าเงินนี้ด้วยข้อมูลปัจจุบันหรือไม่?",
  Create: "สร้าง",
  "Created At": "วันที่สร้าง",
  "Currency Code": "รหัสสกุลเงิน",
  "Current Password": "รหัสผ่านปัจจุบัน",
  "Danger Zone": "โซนอันตราย",
  "Data Management": "จัดการข้อมูล",
  DETAILS: "รายละเอียด",
  Dashboard: "แดชบอร์ด",
  Dec: "ธ.ค.",
  "Deactivate Archive": "ปิดใช้งานคลังข้อมูล",
  "Deactivating...": "กำลังปิดใช้งาน...",
  "Delete Account": "ลบบัญชี",
  "Delete this budget?": "ลบงบประมาณนี้หรือไม่?",
  "Delete this category?": "ลบหมวดหมู่นี้หรือไม่?",
  "Delete this transaction permanently?": "ลบธุรกรรมนี้ถาวรหรือไม่?",
  "Delete this transaction?": "ลบธุรกรรมนี้หรือไม่?",
  Delete: "ลบ",
  "Deleted successfully": "ลบสำเร็จ",
  Detach: "ถอดออก",
  "Detaching...": "กำลังถอดออก...",
  "Dining Out": "ค่าอาหารนอกบ้าน",
  "Dinner at Shabu": "มื้อเย็นที่ชาบู",
  "Do you want to remove your current profile image?": "ต้องการลบรูปโปรไฟล์ปัจจุบันหรือไม่?",
  "Do you want to upload this profile image?": "ต้องการอัปโหลดรูปโปรไฟล์นี้หรือไม่?",
  "Display Name": "ชื่อที่แสดง",
  "E.g. Commercial Bank A": "เช่น ธนาคาร A",
  "E.g. Digital Services": "เช่น บริการดิจิทัล",
  "Electric Bill": "ค่าไฟฟ้า",
  "Edit Transaction": "แก้ไขธุรกรรม",
  "Enable system budget push": "เปิดการแจ้งเตือนงบประมาณของระบบ",
  "Enable system security push": "เปิดการแจ้งเตือนความปลอดภัยของระบบ",
  "Enable system weekly push": "เปิดการแจ้งเตือนรายสัปดาห์ของระบบ",
  "Encrypted Status": "สถานะการเข้ารหัส",
  "English (US)": "อังกฤษ (US)",
  Entertainment: "บันเทิง",
  "Entry Archived Successfully": "บันทึกรายการสำเร็จ",
  EUR: "EUR",
  "EUR - Euro (€)": "EUR - ยูโร (€)",
  "Execute Entry": "บันทึกรายการ",
  "Export CSV": "ส่งออก CSV",
  "Export JSON": "ส่งออก JSON",
  Expense: "รายจ่าย",
  Feb: "ก.พ.",
  "Feature In Development": "ฟีเจอร์อยู่ระหว่างพัฒนา",
  "Financial Overview": "ภาพรวมการเงิน",
  "Food & Drink": "อาหารและเครื่องดื่ม",
  "First Name": "ชื่อ",
  "Food & Drink • 14:20 PM": "อาหารและเครื่องดื่ม • 14:20 น.",
  Freelance: "ฟรีแลนซ์",
  "Fuel Refill": "เติมน้ำมัน",
  "Google login is not configured": "ยังไม่ได้ตั้งค่า Google login",
  "Google sign-in failed, please try again": "เข้าสู่ระบบด้วย Google ไม่สำเร็จ กรุณาลองอีกครั้ง",
  "Google sign-in failed: invalid state": "เข้าสู่ระบบด้วย Google ไม่สำเร็จ: state ไม่ถูกต้อง",
  "Google sign-in failed: invalid token payload": "เข้าสู่ระบบด้วย Google ไม่สำเร็จ: token ไม่ถูกต้อง",
  "Google sign-in failed: token is missing": "เข้าสู่ระบบด้วย Google ไม่สำเร็จ: ไม่พบ token",
  "Google sign-in failed: unable to load profile": "เข้าสู่ระบบด้วย Google ไม่สำเร็จ: ไม่สามารถโหลดข้อมูลผู้ใช้ได้",
  "Google sign-in is currently unavailable": "Google sign-in ยังไม่พร้อมใช้งานในขณะนี้",
  "Google sign-in was cancelled": "ยกเลิกการเข้าสู่ระบบด้วย Google",
  "Grab Ride": "ค่าเดินทาง Grab",
  Health: "สุขภาพ",
  "Hide password": "ซ่อนรหัสผ่าน",
  Identification: "ข้อมูลระบุตัวตน",
  "Identifier (Note)": "ตัวระบุ (หมายเหตุ)",
  Investment: "การลงทุน",
  "Investment Port": "พอร์ตการลงทุน",
  Jan: "ม.ค.",
  Johnathan: "Johnathan",
  "Johnathan Doe": "Johnathan Doe",
  JSON: "JSON",
  Jul: "ก.ค.",
  Jun: "มิ.ย.",
  "Keep me signed in": "จดจำการเข้าสู่ระบบ",
  Income: "รายรับ",
  "Initial Balance": "ยอดเริ่มต้น",
  "JPG, PNG, WEBP (max 10MB)": "JPG, PNG, WEBP (สูงสุด 10MB)",
  "Label Name": "ชื่อป้าย",
  "Last Name": "นามสกุล",
  "Ledger Item": "รายการบัญชี",
  Language: "ภาษา",
  "Loading chart...": "กำลังโหลดกราฟ...",
  "Loading data...": "กำลังโหลดข้อมูล...",
  "Loading transaction detail...": "กำลังโหลดรายละเอียดธุรกรรม...",
  Login: "เข้าสู่ระบบ",
  "Logo Design Project": "โปรเจกต์ออกแบบโลโก้",
  "Lunch Box": "ค่าอาหารกลางวัน",
  "Main Savings": "บัญชีเงินออมหลัก",
  Mar: "มี.ค.",
  "Module Loaded": "โมดูลพร้อมใช้งาน",
  May: "พ.ค.",
  Member: "สมาชิก",
  "Monthly Revenue": "รายรับรายเดือน",
  "Monetary Value": "มูลค่าเงิน",
  "Monthly Performance": "ผลการดำเนินงานรายเดือน",
  "Netflix Monthly": "Netflix รายเดือน",
  "New Entry": "รายการใหม่",
  "New to the system?": "ยังใหม่กับระบบใช่ไหม?",
  "New Password": "รหัสผ่านใหม่",
  "New Transaction": "เพิ่มธุรกรรม",
  Next: "ถัดไป",
  "No file selected": "ยังไม่ได้เลือกไฟล์",
  "No slip uploaded for this transaction.": "ยังไม่ได้อัปโหลดสลิปสำหรับธุรกรรมนี้",
  Note: "หมายเหตุ",
  Nov: "พ.ย.",
  Oct: "ต.ค.",
  "October 2023": "ตุลาคม 2023",
  "Notification Archive": "การแจ้งเตือน",
  "Only JPG, PNG, and WEBP are supported": "รองรับเฉพาะ JPG, PNG และ WEBP",
  "Or continue with": "หรือดำเนินการต่อด้วย",
  "Primary Currency": "สกุลเงินหลัก",
  "Password Changed Successfully": "เปลี่ยนรหัสผ่านสำเร็จ",
  Pharmacy: "ร้านขายยา",
  "Pick a file": "เลือกไฟล์",
  "Please select a wallet before uploading a slip.": "กรุณาเลือกกระเป๋าเงินก่อนอัปโหลดสลิป",
  Previous: "ก่อนหน้า",
  "Profile Image": "รูปโปรไฟล์",
  "Profile image attached": "แนบรูปโปรไฟล์แล้ว",
  "Profile image must be 10MB or less": "รูปโปรไฟล์ต้องมีขนาดไม่เกิน 10MB",
  "Profile image removed": "ลบรูปโปรไฟล์แล้ว",
  "Profile image": "รูปโปรไฟล์",
  "Profile Updated Successfully": "อัปเดตโปรไฟล์สำเร็จ",
  Register: "สมัครสมาชิก",
  "Recent Activity": "กิจกรรมล่าสุด",
  "Regional Settings": "การตั้งค่าภูมิภาค",
  Remove: "ลบ",
  Replace: "แทนที่",
  Salary: "เงินเดือน",
  Saved: "บันทึกแล้ว",
  "Saved successfully": "บันทึกสำเร็จ",
  "Savings Account": "บัญชีเงินออม",
  Savings: "เงินออม",
  "Save Settings": "บันทึกการตั้งค่า",
  "Save changes to this category?": "บันทึกการเปลี่ยนแปลงหมวดหมู่นี้หรือไม่?",
  "Save changes to this wallet?": "บันทึกการเปลี่ยนแปลงกระเป๋าเงินนี้หรือไม่?",
  "Save profile changes?": "บันทึกการเปลี่ยนแปลงโปรไฟล์หรือไม่?",
  "Save system settings?": "บันทึกการตั้งค่าระบบหรือไม่?",
  "Save this budget?": "บันทึกงบประมาณนี้หรือไม่?",
  "Save this category entry?": "บันทึกรายการหมวดหมู่นี้หรือไม่?",
  "Save this transaction record?": "บันทึกรายการธุรกรรมนี้หรือไม่?",
  "Save this wallet entry?": "บันทึกรายการกระเป๋าเงินนี้หรือไม่?",
  Save: "บันทึก",
  "Saving...": "กำลังบันทึก...",
  "Securely export your financial archive for external analysis or backup purposes.": "ส่งออกข้อมูลการเงินของคุณอย่างปลอดภัยเพื่อการวิเคราะห์ภายนอกหรือสำรองข้อมูล",
  "Security Alerts": "แจ้งเตือนความปลอดภัย",
  "Security Key": "คีย์ความปลอดภัย",
  "Security Verified": "ยืนยันความปลอดภัยแล้ว",
  "Select Category": "เลือกหมวดหมู่",
  "Select Currency": "เลือกสกุลเงิน",
  "Select Destination Wallet": "เลือกกระเป๋าเงินปลายทาง",
  "Select Language": "เลือกภาษา",
  "Select Type": "เลือกประเภท",
  "Select Wallet": "เลือกกระเป๋าเงิน",
  "Select category": "เลือกหมวดหมู่",
  "Select wallet": "เลือกกระเป๋าเงิน",
  Sep: "ก.ย.",
  "Session expired, please login again": "เซสชันหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง",
  Settings: "ตั้งค่า",
  "Settings Saved Successfully": "บันทึกการตั้งค่าสำเร็จ",
  Shopping: "ชอปปิง",
  "Show password": "แสดงรหัสผ่าน",
  "Slip image must be 10MB or less.": "รูปสลิปต้องมีขนาดไม่เกิน 10MB",
  "Slip preview": "ตัวอย่างสลิป",
  "Slip upload is still in progress. Please wait.": "กำลังอัปโหลดสลิป โปรดรอสักครู่",
  "Slip Attachment": "แนบสลิป",
  "Slip Attachment (Optional)": "แนบสลิป (ไม่บังคับ)",
  "Summary of this record": "สรุปรายการนี้",
  Subscription: "ค่าสมาชิก",
  "System Language": "ภาษาระบบ",
  "System Manifest": "ข้อมูลระบบ",
  "System Operational": "ระบบพร้อมใช้งาน",
  "System Preferences": "การตั้งค่าระบบ",
  "THB - Thai Baht": "THB - บาทไทย",
  "THB - Thai Baht (฿)": "THB - บาทไทย (฿)",
  THB: "THB",
  "Target Taxonomy": "หมวดหมู่เป้าหมาย",
  "Taxonomy Settings": "ตั้งค่าหมวดหมู่",
  "Taxonomy (Category)": "หมวดหมู่ (Category)",
  "This feature is under development.": "ฟีเจอร์นี้อยู่ระหว่างพัฒนา",
  "This will permanently delete your account and related data. This action cannot be undone.": "การดำเนินการนี้จะลบบัญชีและข้อมูลที่เกี่ยวข้องอย่างถาวร และไม่สามารถกู้คืนได้",
  "This will replace your current profile image. Do you want to continue?": "การดำเนินการนี้จะแทนที่รูปโปรไฟล์ปัจจุบัน ต้องการดำเนินการต่อหรือไม่?",
  "Today, 14:20": "วันนี้, 14:20",
  "Time Period": "ช่วงเวลา",
  "To Wallet": "ไปยังกระเป๋าเงิน",
  "Transfer Category": "หมวดหมู่การโอน",
  "Transfer In": "โอนเข้า",
  "Transfer Out": "โอนออก",
  "Transfer between wallets?": "โอนระหว่างกระเป๋าเงินหรือไม่?",
  Transfer: "โอน",
  Transport: "การเดินทาง",
  "Total Balance": "ยอดรวม",
  "Total Net Worth": "มูลค่าสุทธิรวม",
  "Transaction Date": "วันที่ทำรายการ",
  "Transaction Detail": "รายละเอียดธุรกรรม",
  "Transaction Ledger": "รายการธุรกรรม",
  "Transaction id is missing.": "ไม่พบรหัสธุรกรรม",
  "Transaction slip": "สลิปธุรกรรม",
  "Transaction Overview": "ภาพรวมธุรกรรม",
  "Transfer Route": "เส้นทางโอน",
  "Unable to load transaction detail.": "ไม่สามารถโหลดรายละเอียดธุรกรรมได้",
  Uncategorized: "ไม่จัดหมวดหมู่",
  "Uniqlo Store": "ร้าน Uniqlo",
  Unknown: "ไม่ทราบ",
  "Unknown Wallet": "ไม่ทราบกระเป๋าเงิน",
  Update: "อัปเดต",
  Upload: "อัปโหลด",
  "Uploaded profile image": "อัปโหลดรูปโปรไฟล์แล้ว",
  Type: "ประเภท",
  "Type Classification": "การจัดประเภท",
  "USD - US Dollar": "USD - ดอลลาร์สหรัฐ",
  "USD - US Dollar ($)": "USD - ดอลลาร์สหรัฐ ($)",
  USD: "USD",
  "User Identity": "ข้อมูลผู้ใช้",
  Username: "ชื่อผู้ใช้",
  "Updated At": "วันที่อัปเดต",
  "Verifying Google sign-in...": "กำลังยืนยันการเข้าสู่ระบบด้วย Google...",
  Version: "เวอร์ชัน",
  "View All": "ดูทั้งหมด",
  "View All Ledger": "ดูรายการทั้งหมด",
  "View Detail": "ดูรายละเอียด",
  "All Activity": "กิจกรรมทั้งหมด",
  Expenses: "รายจ่าย",
  Displaying: "กำลังแสดง",
  Records: "รายการ",
  "Previous Archive": "หน้าก่อนหน้า",
  "Next Archive": "หน้าถัดไป",
  "Module Locked": "โมดูลถูกล็อก",
  "Return to Core": "กลับหน้าหลัก",
  Edit: "แก้ไข",
  "Delete transaction": "ลบธุรกรรม",
  "member-settings-update-failed": "บันทึกการตั้งค่าการแจ้งเตือนไม่สำเร็จ",
  "member-settings-info-failed": "โหลดการตั้งค่าการแจ้งเตือนไม่สำเร็จ",
  "request-failed": "คำขอล้มเหลว",
  "Manage Assets": "จัดการสินทรัพย์",
  "Budget Status": "สถานะงบประมาณ",
  "Execute New Transaction": "บันทึกรายการใหม่",
  "From Wallet": "จากกระเป๋าเงิน",
  "Select Source Wallet": "เลือกกระเป๋าเงินต้นทาง",
  "Select Transfer Category": "เลือกหมวดหมู่การโอน",
  "Uploading slip...": "กำลังอัปโหลดสลิป...",
  "Register New Asset": "ลงทะเบียนสินทรัพย์ใหม่",
  "Asset Inventory": "รายการสินทรัพย์",
  "Define New Taxonomy": "กำหนดหมวดหมู่ใหม่",
  "Add Classification": "เพิ่มการจัดประเภท",
  "Taxonomy Stats": "สถิติหมวดหมู่",
  "Total Classes": "จำนวนทั้งหมด",
  "Existing Archive": "รายการที่มีอยู่",
  "Set Spending Constraint": "ตั้งข้อจำกัดการใช้จ่าย",
  "Active Constraints": "ข้อจำกัดที่ใช้งานอยู่",
  Constraint: "ข้อจำกัด",
  Used: "ใช้ไปแล้ว",
  Terminate: "ยกเลิก",
  Confirmed: "ยืนยันแล้ว",
  daily: "รายวัน",
  weekly: "รายสัปดาห์",
  monthly: "รายเดือน",
  Wallet: "กระเป๋าเงิน",
  "Wallet Archived": "บันทึกกระเป๋าเงินแล้ว",
  "Wallet Detailed Archive": "รายละเอียดกระเป๋าเงิน",
  "Wallet transfer": "การโอนระหว่างกระเป๋าเงิน",
  "Wallet Color": "สีกระเป๋าเงิน",
  Wallets: "กระเป๋าเงิน",
  "Weekly Alerts": "แจ้งเตือนรายสัปดาห์",
  "Wealth Archive": "คลังความมั่งคั่ง",
  Yesterday: "เมื่อวาน",
  "You have reached 85% of your": "คุณใช้ไปแล้ว 85% ของ",
  "budget.": "งบประมาณ",
  "ไทย (Thai)": "ไทย",
  "฿ 120,000.00": "฿ 120,000.00",
  "฿ 142,500.00": "฿ 142,500.00",
  "฿ 2,500.00": "฿ 2,500.00",
  Overview: "ภาพรวม",
  Management: "จัดการ",
  Entry: "บันทึกรายการ",
  System: "ระบบ",
  Logout: "ออกจากระบบ",
  Menu: "เมนู",
  "Quick Entry": "บันทึกด่วน",
};

const thDictionaryCaseInsensitive: Record<string, string> = Object.fromEntries(
  Object.entries(thDictionary).map(([key, value]) => [key.toLowerCase(), value]),
);

const menuFallbackMap: Array<[RegExp, string]> = [
  [/^overview$/i, "ภาพรวม"],
  [/^dashboard$/i, "แดชบอร์ด"],
  [/^transaction ledger$/i, "รายการธุรกรรม"],
  [/^management$/i, "จัดการ"],
  [/^wallets?$/i, "กระเป๋าเงิน"],
  [/^categories$/i, "หมวดหมู่"],
  [/^budgets?$/i, "งบประมาณ"],
  [/^entry$/i, "บันทึกรายการ"],
  [/^new transaction$/i, "เพิ่มธุรกรรม"],
  [/^system$/i, "ระบบ"],
  [/^account profile$/i, "โปรไฟล์บัญชี"],
  [/^settings?$/i, "ตั้งค่า"],
  [/^authenticated as$/i, "เข้าสู่ระบบเป็น"],
  [/^logout$/i, "ออกจากระบบ"],
  [/^menu$/i, "เมนู"],
  [/^quick entry$/i, "บันทึกด่วน"],
  [/^total net worth$/i, "มูลค่าสุทธิรวม"],
];

const resolveLocale = (value: string | null | undefined): AppLocale => {
  return String(value || "").trim().toUpperCase() === "TH" ? "th" : "en";
};

const applyLocale = (locale: AppLocale) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCALE_KEY, locale);
    window.dispatchEvent(new CustomEvent(LOCALE_EVENT, { detail: locale }));
  }

  if (typeof document !== "undefined") {
    document.documentElement.lang = locale;
  }
};

const textSourceByNode = new WeakMap<Text, string>();
const lastTranslatedByNode = new WeakMap<Text, string>();

const translatePhrase = (source: string, locale: AppLocale): string => {
  if (locale === "en") {
    return source;
  }

  const pageMatch = source.match(/^Page\s+(\d+)\s*\/\s*(\d+)$/);
  if (pageMatch) {
    return `หน้า ${pageMatch[1]} / ${pageMatch[2]}`;
  }

  if (source.includes("The ") && source.includes(" interface is ready for integration.")) {
    return source.replace(
      /^The\s+(.+)\s+interface is ready for integration\.$/,
      "ส่วน $1 พร้อมสำหรับการเชื่อมต่อแล้ว",
    );
  }

  if (source.includes("You have reached 85% of your")) {
    return source.replace("You have reached 85% of your", "คุณใช้ไปแล้ว 85% ของ");
  }

  const deleteMatch = source.match(/^Delete transaction\s+(.+)\?$/);
  if (deleteMatch) {
    return `ลบธุรกรรม ${deleteMatch[1]}?`;
  }

  const transferToMatch = source.match(/^Transfer\s+to\s+(.+)$/);
  if (transferToMatch) {
    return `โอนไปยัง ${transferToMatch[1]}`;
  }

  const transferFromMatch = source.match(/^Transfer\s+from\s+(.+)$/);
  if (transferFromMatch) {
    return `โอนมาจาก ${transferFromMatch[1]}`;
  }

  const transferBetweenMatch = source.match(/^Transfer\s+between\s+(.+)$/);
  if (transferBetweenMatch) {
    return `โอนระหว่าง ${transferBetweenMatch[1]}`;
  }

  const notificationAlertMatch = source.match(/^(budget|security|weekly)\s+Alerts$/i);
  if (notificationAlertMatch) {
    const key = notificationAlertMatch[1].toLowerCase();
    if (key === "budget") {
      return "แจ้งเตือนงบประมาณ";
    }
    if (key === "security") {
      return "แจ้งเตือนความปลอดภัย";
    }
    return "แจ้งเตือนรายสัปดาห์";
  }

  const enablePushMatch = source.match(/^Enable\s+system\s+(budget|security|weekly)\s+push$/i);
  if (enablePushMatch) {
    const key = enablePushMatch[1].toLowerCase();
    if (key === "budget") {
      return "เปิดการแจ้งเตือนงบประมาณของระบบ";
    }
    if (key === "security") {
      return "เปิดการแจ้งเตือนความปลอดภัยของระบบ";
    }
    return "เปิดการแจ้งเตือนรายสัปดาห์ของระบบ";
  }

  const ofRecordsMatch = source.match(/^of\s+(\d+)\s+Records$/);
  if (ofRecordsMatch) {
    return `จากทั้งหมด ${ofRecordsMatch[1]} รายการ`;
  }

  const direct = thDictionary[source];
  if (direct) {
    return direct;
  }

  const lower = source.toLowerCase();
  const insensitive = thDictionaryCaseInsensitive[lower];
  if (insensitive) {
    return insensitive;
  }

  for (const [pattern, replacement] of menuFallbackMap) {
    if (pattern.test(source)) {
      return replacement;
    }
  }

  return source;
};

const translateTextNodes = (locale: AppLocale) => {
  if (typeof document === "undefined") {
    return;
  }

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();

  while (node) {
    const textNode = node as Text;
    const parent = textNode.parentElement;

    if (!parent) {
      node = walker.nextNode();
      continue;
    }

    if (["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"].includes(parent.tagName)) {
      node = walker.nextNode();
      continue;
    }

    const currentValue = textNode.nodeValue ?? "";
    const trackedSource = textSourceByNode.get(textNode);
    const lastTranslated = lastTranslatedByNode.get(textNode);

    if (!textSourceByNode.has(textNode)) {
      textSourceByNode.set(textNode, currentValue);
    } else if (
      trackedSource !== undefined
      && lastTranslated !== undefined
      && currentValue !== lastTranslated
      && currentValue !== trackedSource
    ) {
      textSourceByNode.set(textNode, currentValue);
    }

    const raw = textSourceByNode.get(textNode) ?? currentValue;

    const trimmed = raw.trim();
    if (!trimmed) {
      node = walker.nextNode();
      continue;
    }

    const leading = raw.match(/^\s*/)?.[0] || "";
    const trailing = raw.match(/\s*$/)?.[0] || "";
    const translated = translatePhrase(trimmed, locale);

    const finalValue = `${leading}${translated}${trailing}`;
    textNode.nodeValue = finalValue;
    lastTranslatedByNode.set(textNode, finalValue);
    node = walker.nextNode();
  }
};

export default defineNuxtPlugin(async (nuxtApp: any) => {
  if (typeof window === "undefined") {
    return;
  }

  let activeLocale: AppLocale = resolveLocale(localStorage.getItem(LOCALE_KEY));
  let rafId = 0;
  const scheduleTranslate = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(() => {
      translateTextNodes(activeLocale);
      rafId = 0;
    });
  };

  const observer = new MutationObserver(() => {
    scheduleTranslate();
  });
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    characterData: true,
  });

  window.addEventListener(LOCALE_EVENT, (event) => {
    const detail = (event as CustomEvent<AppLocale>).detail;
    activeLocale = resolveLocale(detail);
    scheduleTranslate();
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== LOCALE_KEY) {
      return;
    }
    activeLocale = resolveLocale(event.newValue);
    scheduleTranslate();
  });

  nuxtApp.hook("page:finish", () => {
    activeLocale = resolveLocale(localStorage.getItem(LOCALE_KEY));
    scheduleTranslate();
  });

  const saved = resolveLocale(localStorage.getItem(LOCALE_KEY));
  activeLocale = saved;
  applyLocale(saved);
  scheduleTranslate();

  const authApi = useAuthApi();
  const accessToken = authApi.getAccessToken().trim();
  const accessExpiresAt = authApi.getAccessExpiresAt();
  if (!accessToken || (accessExpiresAt > 0 && accessExpiresAt <= Date.now())) {
    return;
  }

  try {
    const res = await authApi.getMySettings();
    const locale = resolveLocale(res.data?.preferred_language);
    activeLocale = locale;
    applyLocale(locale);
    scheduleTranslate();
  } catch {
    // Keep current locale when settings endpoint is unavailable.
  }
});
