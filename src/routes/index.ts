import { Router } from "express";
import { Role } from "../../generated/prisma";

import { AttendanceRoute } from "../features/attendance/attendance.routes";
import { DriverRoute } from "../features/driver-task/driver.routes";
import { WorkerRoute } from "../features/worker/worker.routes";
import { EmployeeProfileRoute } from "../features/employeeProfile/employeeProfile.routes";

import authCustomerRoutes from "../features/authCustomer/authCustomer.routes";
import authEmployeRoutes from "../features/authEmployee/authEmployee.routes";
import profileCustomerRoutes from "../features/cutomerProfile/profile.routes";
import addressCustomerRoutes from "../features/addressCustomer/address.routes";
import orderCustomerRoutes from "../features/orderCustomer/order.routes";
import regionAddressRoutes from "../features/region/region.routes";
import payementRoutes from "../features/paymentCustomer/payments.routes";

import employeeRoutes from "../features/employee/employee.route";
import outletRoutes from "../features/outlet/outlet.route";
import laundryItemRoutes from "../features/laundry-item/laundry-item.route";
import pricingRoutes from "../features/pricing/pricing.route";
import orderRoutes from "../features/order/order.route";
import bypassRoutes from "../features/bypass/bypass.route";
import customerRoutes from "../features/customer/customer.route";
import complaintRoutes from "../features/complaint/complaint.route";
import reportRoutes from "../features/report/report.route";
import dashboardRoutes from "../features/dashboard/dashboard.route";
import internalRoutes from "../features/orderActionCustomer/autoConfirm.routes"

import { AuthMiddleware } from "../middlewares/auth.middlewares";

const router = Router();

// Field Ops
router.use("/internal/attendance", AttendanceRoute);
router.use("/internal/driver", DriverRoute);
router.use("/internal/worker", WorkerRoute);
router.use("/internal/profile", EmployeeProfileRoute);

// Authentication
router.use("/auth", authCustomerRoutes);
router.use("/auth/employee", authEmployeRoutes);

// Customer
router.use("/profile", AuthMiddleware.authenticated(), profileCustomerRoutes);

router.use("/address", AuthMiddleware.authenticated(), AuthMiddleware.authorized([Role.CUSTOMER]), addressCustomerRoutes);

router.use("/order", orderCustomerRoutes, payementRoutes);

router.use("/regions", AuthMiddleware.authenticated(), regionAddressRoutes);

// Internal / Back Office
router.use("/internal/employees", employeeRoutes);
router.use("/internal/outlets", outletRoutes);
router.use("/internal/laundry-items", laundryItemRoutes);
router.use("/internal/pricing", pricingRoutes);
router.use("/internal/orders", orderRoutes);
router.use("/internal/bypass-requests", bypassRoutes);
router.use("/internal/customers", customerRoutes);
router.use("/internal/complaints", complaintRoutes);
router.use("/internal/reports", reportRoutes);
router.use("/internal/dashboard", dashboardRoutes);

// jobs
router.use("/job", internalRoutes);

export default router;
