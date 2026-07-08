import Order from "../models/orderModel.js";

export const getDashboardData = async (req, res) => {
  try {
    const orders = await Order.find();

    const totalOrders = orders.length;

    const totalRevenue = orders.reduce(
      (acc, o) => acc + (o.amount || 0),
      0
    );

    // latest orders
    const latestOrders = orders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    // ---------------------------
    // 📊 PIE CHART (ORDER STATUS)
    // ---------------------------
    const statusCount = {};

    orders.forEach((o) => {
      statusCount[o.status] = (statusCount[o.status] || 0) + 1;
    });

    const pieData = Object.keys(statusCount).map((key) => ({
      name: key,
      value: statusCount[key],
    }));

    // ---------------------------
    // 📈 MONTHLY REVENUE
    // ---------------------------
    const monthly = {};

    orders.forEach((o) => {
      const month = new Date(o.createdAt).toLocaleString("default", {
        month: "short",
      });

      monthly[month] = (monthly[month] || 0) + o.amount;
    });

    const monthlyRevenue = Object.keys(monthly).map((m) => ({
      month: m,
      revenue: monthly[m],
    }));

    // ---------------------------
    // 📈 WEEKLY REVENUE
    // ---------------------------
    const weekly = {};

    orders.forEach((o) => {
      const week = `Week ${Math.ceil(new Date(o.createdAt).getDate() / 7)}`;

      weekly[week] = (weekly[week] || 0) + o.amount;
    });

    const weeklyRevenue = Object.keys(weekly).map((w) => ({
      week: w,
      revenue: weekly[w],
    }));

    // ---------------------------
    // 🧾 TOP CUSTOMERS
    // ---------------------------
    const customers = {};

    orders.forEach((o) => {
      customers[o.userId] =
        (customers[o.userId] || 0) + o.amount;
    });

    const topCustomers = Object.keys(customers)
      .map((u) => ({
        userId: u,
        spent: customers[u],
      }))
      .sort((a, b) => b.spent - a.spent)
      .slice(0, 5);

    // ---------------------------
    // 🍔 TOP PRODUCTS
    // ---------------------------
    const products = {};

    orders.forEach((o) => {
      o.items.forEach((item) => {
        products[item.name] =
          (products[item.name] || 0) + item.quantity;
      });
    });

    const topProducts = Object.keys(products)
      .map((p) => ({
        name: p,
        qty: products[p],
      }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);

    // ---------------------------
    // 📊 GROWTH %
    // ---------------------------
    const growth =
      totalRevenue > 0 ? ((totalRevenue / 1000) * 10).toFixed(2) : 0;

    res.json({
      success: true,
      totalOrders,
      totalRevenue,
      latestOrders,
      pieData,
      monthlyRevenue,
      weeklyRevenue,
      topCustomers,
      topProducts,
      growth,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};