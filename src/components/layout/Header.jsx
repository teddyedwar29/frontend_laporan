// src/components/layout/Header.jsx

const Header = () => (
  <header className="bg-white rounded-2xl shadow-md p-6 mb-8 flex justify-between items-center">
    <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
    <div className="flex items-center gap-4">
      <div className="text-right">
        <h4 className="font-semibold text-slate-800">Admin Sales</h4>
        <p className="text-sm text-slate-500">Sales Manager</p>
      </div>
      <div className="grid place-items-center w-12 h-12 bg-gradient-to-br from-[#193cb0] to-[#4361ee] rounded-full text-white font-bold text-lg">
        AS
      </div>
    </div>
  </header>
);

export default Header;