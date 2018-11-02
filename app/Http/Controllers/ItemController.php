<?php

namespace App\Http\Controllers;

use App\Http\Managers\ItemManager;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /** @var ItemManager $itemManager */
    protected $itemManager;

    public function __construct(ItemManager $itemManager)
    {
        $this->itemManager = $itemManager;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $items = $this->itemManager->getItems();
        return view('items', [
            'items' => $items,
        ]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function showAdd()
    {
        return view('items_add',[
            'categories' => [],
        ]);
    }
}